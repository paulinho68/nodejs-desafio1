const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
	autoescape: true,
	express: app,
	watch: true,
});

const checkIdadeExistMiddlewares = (req, res, next) => {
	if (req.params.idade || req.body.idade) {
		return next();
	} else {
		return res.redirect("/");
	}
};

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "njk");

app.get("/", (req, res) => {
	return res.render("form");
});

app.post("/check", checkIdadeExistMiddlewares, (req, res) => {
	const idade = req.body.idade;

	if (idade > 18) {
		return res.redirect(`/maior/${idade}`);
	} else {
		return res.redirect(`/menor/${idade}`);
	}
});

app.get("/maior/:idade", checkIdadeExistMiddlewares, (req, res) => {
	const idade = req.params.idade;
	return res.render("maior", { idade });
});

app.get("/menor/:idade", checkIdadeExistMiddlewares, (req, res) => {
	const idade = req.params.idade;
	return res.render("menor", { idade });
});

app.listen(3000);
