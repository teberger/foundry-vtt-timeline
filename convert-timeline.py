from html.parser import HTMLParser
import json

from enum import Enum, auto

TIMELINE_FILE = './wa-timeline-copy.html'
OUT_FILE = './wa-timeline-entry-data.json'
EVENT_CLASS_ENUMERATION = set(['trivial', 'minor', 'important', 'major', 'milestone'])

class WaParser(HTMLParser):
    path = []
    parse_mode = "none"
    all_entries = []
    current_entry = {
            "year" : 0,
            "month" : -1,
            "day" : -1,
            "hours" : 0,
            "minutes" : 0,
            "eventClass" : "",
            "eventType" : "",
            "eventTitle" : "",
            "htmlDescription" : ""
        }
    passthrough = False
    content_builder = ""
    data_handler = id
    cannot_be_empty = True

    def handle_starttag(self, tag, attr):
        if len(self.path) > 0:
            self.path.append(tag)
            self.content_builder += f'<{tag}>'
            return

        attr = dict(attr)
        for key in attr:
            attr[key] = set(attr[key].split(' '))

        if tag == 'div':
            self.handle_div(tag, attr)
        elif tag == 'li':
            self.handle_li(tag, attr)
        elif tag == 'h4':
            self.handle_h4(tag, attr)

    def handle_endtag(self, tag):
        if len(self.path) > 0:
            self.path.pop()

            if len(self.path) == 0:
                self.current_entry['htmlDescription'] = self.content_builder.strip()
                self.content_builder = ""
            else:
                self.content_builder += f'</{tag}>'
            return 

        if tag == 'li':
            self.all_entries.append(self.current_entry)
            self.reset_entry()

    def handle_data(self, data):
        if len(self.path) > 0:
            self.content_builder += ' '.join(map(lambda x: x.strip(), data.split('\n')))
            return

        if len(data.strip()) == 0 and self.cannot_be_empty:
            return

        self.data_handler(data)
        self.data_handler = id

    def handle_div(self, tag, attr):
        if 'class' in attr and 'history-content' in attr['class']:
            self.path.append(tag)
        elif 'class' in attr and 'history-year' in attr['class']:
            def handler(x):
                year = x.strip().split(' ')[0]
                self.current_entry['year'] = int(year)
            self.data_handler = handler
        elif 'class' in attr and 'history-day' in attr['class'] and self.current_entry['day'] == -1:
            def handler(x):
                day = int(x.strip())
                self.current_entry['day'] = day
            self.data_handler = handler
        elif 'class' in attr and 'history-month' in attr['class'] and self.current_entry['month'] == -1:
            def handler(x):
                month = int(x.strip().split('/')[1])
                self.current_entry['month'] = month
            self.data_handler = handler
        elif 'class' in attr and 'history-hour' in attr['class']:
            def handler(x):
                time_string = x.strip().split('-')[0]
                if time_string != '':
                    time_string_ls = time_string.split(':')
                    self.current_entry['hours'] = int(time_string_ls[0])
                    if len(time_string_ls) > 1:
                        self.current_entry['minutes'] = int(time_string_ls[1])
                self.cannot_be_empty = True

            self.cannot_be_empty = False
            self.data_handler = handler

    def handle_li(self, tag, attr):
        if 'timeline-entry' in attr['class']:
            entry_class = EVENT_CLASS_ENUMERATION & attr['class']
            self.current_entry['eventClass'] = entry_class.pop() if len(entry_class) > 0 else "trivial"

    def handle_h4(self, tag, attr):
        def handler(x):
            self.current_entry['eventTitle'] = x.strip()

        self.data_handler = handler
    
    def handle_small(self, tag, attr):
        def handler(x):
            if len(x.strip()) == 0:
                return
            else:
                self.current_entry['entryType'] = x.strip()
                self.cannot_be_empty = True
        self.cannot_be_empty = False
        self.data_handler = handler

    def reset_entry(self):
        self.current_entry = {
            "year" : 0,
            "month" : -1,
            "day" : -1,
            "hours" : 0,
            "minutes" : 0,
            "eventClass" : "",
            "eventType" : "",
            "eventTitle" : "",
            "htmlDescription" : ""
        }

if __name__ == '__main__':
    parser = WaParser()

    with open(TIMELINE_FILE, 'r') as f:
        parser.feed(f.read())
        entry_len = len(parser.all_entries)

        print(f'Number of entries parsed: {entry_len}')
        print(parser.all_entries[0])
    
    with open(OUT_FILE, 'w') as f:
        json.dump(parser.all_entries, f, indent=2)