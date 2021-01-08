.PHONY: up

up:
	git add .
	git commit -am "update"
	git pull
	git push
	@echo "\n 代码提交发布..."
