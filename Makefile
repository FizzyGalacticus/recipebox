configfile=config.env
ifdef cnf
configfile=$(cnf)
endif
include $(configfile)
export $(shell sed 's/=.*//' $(configfile))

deployfile=deploy.env
ifdef dpl
configfile=$(dpl)
endif
include $(deployfile)
export $(shell sed 's/=.*//' $(deployfile))

TAG=$(shell git log --pretty=format:'%h' -n 1)
NAMESPACE=recipes
ARGS=-t --env-file ./config.env -p 5000:5000 -p 27017:27017 -v /data/db/recipebox:/data/db --name $(APP_NAME) $(NAMESPACE)/$(APP_NAME):$(TAG)

build:
	docker build --rm -t $(NAMESPACE)/$(APP_NAME):$(TAG) .

build-nc:
	docker build --rm --no-cache -t $(NAMESPACE)/$(APP_NAME):$(TAG) .

run:
	docker run -d $(ARGS)

up: build run

stop:
	docker stop $(APP_NAME)

restart: stop run

it:
	docker run -it $(ARGS) bash