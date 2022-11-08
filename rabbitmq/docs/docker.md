# Install docker rabbitmq
>docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.10-management

# Install docker rabbitmq with a container
>docker pull rabbitmq:3.10-management

>docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.10-management