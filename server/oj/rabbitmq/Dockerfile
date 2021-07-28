FROM rabbitmq:3-management
RUN apt-get update
RUN apt-get install -y curl 
COPY ./rabbitmq.conf /etc/rabbitmq/rabbitmq.conf
EXPOSE 4369 5671 5672 25672 15671 15672