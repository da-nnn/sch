from random import choice as rc
from rest_framework import views
from rest_framework.response import Response
from . import serializers
from . import utils
from bs4 import BeautifulSoup

class ScraperAPIView(views.APIView):
    serializer_class = serializers.ScrapedScholarshipSerializer

    def get(self, request, *args, **kwargs):
        data = []

        page_number = request.GET.get('pageNumber')
        html_content = utils.get_scrape_content(page_number)
        soup = BeautifulSoup(html_content, 'html.parser')

        items = soup.find_all('tr')
        
        for item in items:
            name_tag = item.find('td', class_='views-field-field-scholarship-name-')
            scholarship_type_tag = item.find('td', class_='views-field-field-duration')
            deadline_tag = item.find('td', class_='views-field-field-application-deadline')
            country_tag = item.find('td', class_='views-field-field-country')
            duration_tag = item.find('td', class_='views-field-field-year')
            donwload_link_tag = item.find('span', class_='file--application-pdf')

            if ((name_tag is not None) and 
                (scholarship_type_tag is not None) and 
                (deadline_tag is not None) and 
                (country_tag is not None) and 
                (duration_tag is not None) and 
                (donwload_link_tag is not None)):
                name_p_tag = name_tag.find('p')
                if name_p_tag is not None:
                    name = name_p_tag.text.strip()
                    scholarship_type = scholarship_type_tag.text.strip()
                    country = country_tag.text.strip()
                    deadline = deadline_tag.text.strip()
                    duration = duration_tag.text.strip()
                    donwload_link = donwload_link_tag.find('a').get('href')

                    scholarship_info = {
                        'name':name,
                        'scholarship_type': scholarship_type,
                        'country': country,
                        'deadline': deadline,
                        'duration': duration,
                        'donwload_link': donwload_link
                    }
                    data.append(scholarship_info)

        serializer = self.serializer_class(data, many=True)
        return Response(serializer.data)