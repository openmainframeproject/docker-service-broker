FROM python:2.7

WORKDIR /data/docker_workdir
ADD . /data/docker_workdir
RUN pip install -r requirements.txt

EXPOSE 443
ENV NAME Front-End
CMD ["python", "serviceBrokerWeb.py"]
