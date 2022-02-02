const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const getRawBody = require('raw-body')
const Router = require('koa-router');

let router = new Router();

router.post('/user', async (ctx) => {
  ctx.body = {
    message: "Пользователь сохранён."
  };
});

router.post('/image', async (ctx) => {
  let body = await getRawBody(ctx.req, {
    limit: '1mb'
  });
  ctx.body = {
    message: `Изображение сохранено, размер:${body.length}.`
  };
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());


if (!module.parent) {
  http.createServer(app.callback()).listen(8080);
} else {
  exports.accept = app.callback();
}
