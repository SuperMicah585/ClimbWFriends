from flask import Flask, jsonify ,request
from lxml import html
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will allow all domains by default


@app.route('/scrapeclimbs', methods=['GET'])

def scrape_climbs():
    mpURL = request.args.get('mpURL')
    name = request.args.get('name')
    print(name,"name")
    counter = 1
    climbDic = []
    response = None  # Initialize response before the try block
    try:
        while counter ==1:
            url = f'{mpURL}?page={counter}'
            response = requests.get(url)
            #print(response.status,"micahdsfjhsbdfjhsbjd")
            tree = html.fromstring(response.content)
            xpath_expression = '//tr[@class="route-row"]'
            matching_elements = tree.xpath(xpath_expression)
            
            if not matching_elements:
                break

            for element in matching_elements:
                climb_urls = []
                area_URLs = []
                parent_area = ''
                text_lines = element.text_content().split('\n')
                i = 0
                tmpArray = []
                for line in text_lines:
                    if i in [4, 22, 28]:
                        tmpArray.append(line.strip())
                    i += 1

                a_elements = element.xpath('.//a')
                href = None
                for a_element in a_elements:
                    href = a_element.get('href')
                    climb_urls.append(href.split('/'))

                if href:
                    response = requests.get(href)
                    area_tree = html.fromstring(response.content)
                    climb_tree = area_tree.xpath('.//div[@class="mb-half small text-warm"]//a')
                    for element in climb_tree:
                        area_URLs.append(element.get('href'))
                    
                    split_url = area_URLs[-1].split('/')
                    parent_area = split_url[-1]

                    description_details_tables = area_tree.xpath('.//table[@class="description-details"]')
                    for table in description_details_tables:
                        table_rows = table.xpath('.//tr')
                        for i, row in enumerate(table_rows):
                            row_text = row.text_content().strip()
                            if 'GPS:' in row_text:
                                next_row = table_rows[i]
                                next_td = next_row.xpath('.//td')[1]
                                next_td_text = next_td.text_content().strip()
                                first_line_text = next_td_text.split('\n')[0]
                                lat_str, lon_str = first_line_text.split(',')
                                latitude = float(lat_str.strip())
                                longitude = float(lon_str.strip())
                                coordinate_array = [latitude, longitude]

                                climbDic.append({
                                    "id": climb_urls[0][4],
                                    "name": tmpArray[1],
                                    "climber_names": [name],
                                    "grade": tmpArray[0],
                                    "coordinates": [coordinate_array[1], coordinate_array[0]]
                                })

            counter += 1

        return jsonify(climbDic)
    except:
        print('except')
        return jsonify({'error': f'Failed to fetch data'}), 400

if __name__ == '__main__':
    app.run(port=5000)
