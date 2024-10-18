from rest_framework import serializers

class ScrapedScholarshipSerializer(serializers.Serializer):
    name = serializers.CharField()
    scholarship_type = serializers.CharField()
    deadline = serializers.CharField()
    country = serializers.CharField()
    duration = serializers.CharField()
    donwload_link = serializers.CharField()
