
Run:

npm i
npm run dev

Error

```
{"level":40,"time":1641573385409,"pid":3474148,"hostname":"acentera-xps9560","msg":"\"root\" path \"/home/flavalliere/dev/data/workspaces/acentera/fastify-static-bug/dist/client/assets/\" must exist"}
{"level":30,"time":1641573385417,"pid":3474148,"hostname":"acentera-xps9560","msg":"Server listening at http://0.0.0.0:8080"}
http://0.0.0.0:8080
1 - URL IS /static/afsdfs
{"level":30,"time":1641573386905,"pid":3474148,"hostname":"acentera-xps9560","reqId":"req-1","req":{"method":"GET","url":"/static/afsdfs","hostname":"127.0.0.1:8080","remoteAddress":"127.0.0.1","remotePort":36856},"msg":"incoming request"}
{"level":50,"time":1641573386907,"pid":3474148,"hostname":"acentera-xps9560","reqId":"req-1","err":{"type":"FastifyError","message":"Promise may not be fulfilled with 'undefined' when statusCode is not 204","stack":"FastifyError: Promise may not be fulfilled with 'undefined' when statusCode is not 204\n    at /home/flavalliere/dev/data/workspaces/acentera/fastify-static-bug/node_modules/fastify/lib/wrapThenable.js:30:30\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)","name":"FastifyError","code":"FST_ERR_PROMISE_NOT_FULFILLED","statusCode":500},"msg":"Promise may not be fulfilled with 'undefined' when statusCode is not 204"}
```
