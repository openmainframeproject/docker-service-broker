FROM python:2.7

WORKDIR /app
ADD . /app
RUN pip install -r requirements.txt

EXPOSE 443
ENV NAME Front-End
CMD ["python", "serviceBrokerWeb.py"]
