BIN=$(shell pwd)/node_modules/.bin
S=$(shell jq '.server' config.json)
P=$(shell jq '.path' config.json)
C=$(shell echo "$S:$P/")

YARN := yarn
NPM := npm

develop:
	@clear
	@$(BIN)/gatsby develop

install:
	$(YARN) install

clean:
	@rm -f package-lock.json yarn.lock yarn-error.log
	@rm -rf node_modules/ .cache/
	$(YARN) cache clean
	$(NPM) cache clean --force

build:
	@$(BIN)/gatsby build

deploy:
	@$(MAKE) build
	@cd public && rm *.map
	@cd public && tar -cvf build.tar.gz *
	@scp public/build.tar.gz $C
	@ssh $S "cd $P && tar -xvf build.tar.gz"