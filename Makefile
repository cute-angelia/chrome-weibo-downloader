.PHONY: up

up:
	git add .
	git commit -am "update"
	git pull origin main
	git push origin main
	@echo "\n 代码提交发布..."
