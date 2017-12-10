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

DATA_DIR=/data/db/recipebox
CERT_DIR=/certs

TAG=$(shell git log --pretty=format:'%h' -n 1)
NAMESPACE=recipes
ARGS=-t --env-file ./config.env -p 5000:5000 -p 27017:27017 -v $(DATA_DIR):/data/db -v $(CERT_DIR):/certs --name $(APP_NAME) $(NAMESPACE)/$(APP_NAME):$(TAG)

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

npm:
	sudo PORT=443 node server/server.js 

%::
	@echo "Valid choices:"
	@echo "  build      : build image"
	@echo "  build-nc   : build image without using cache"
	@echo "  run        : start image"
	@echo "  up         : build (no cache) and run image"
	@echo "  stop       : stop image"
	@echo "  restart    : restart image (same as stop, then run)"
	@echo "  it         : run image with an interactive prompt"
	@echo "  npm        : run npm server on port 80"