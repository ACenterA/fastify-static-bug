import * as fs from 'fs'
import * as path from 'path'
import Fastify from 'fastify'
import * as FastifyStatic from 'fastify-static'
import * as FastifyEtag from 'fastify-etag'

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

let PREFIX = '/static/'

const rewriteUrlFct = function (req: any) {
  const urlTest = req.url
  console.error('URL IS', urlTest)
  return urlTest
}

const rewriteProdUrlFct = function (req: any) {
  console.error('1 - URL IS', req.url)
  return req.url
}

const rewriteUrl = isTest ? rewriteUrlFct : rewriteProdUrlFct

const fastify: any = Fastify({
    logger: true,
    ignoreTrailingSlash: true,
    rewriteUrl
})


const config = { dev: false };
config.dev = require.main === module

async function createServer(
    root = process.cwd(),
    isProd = process.env.NODE_ENV === 'production'
) {
    const resolve = (p: string) => path.resolve(__dirname, p)

    let distPrefix = 'dist/'
    let generatedDistDir = resolve(`${distPrefix}static`)
    let distCheckFolder = `${generatedDistDir}`
    console.error('Will try to resove of: ', `${distCheckFolder}`)
    if (!(fs.existsSync(generatedDistDir))) {
      // dist/static not exist are we running server.js from dist/ folder?
      distPrefix = './'
      generatedDistDir = resolve(`${distPrefix}static`)
      console.error('Will try to resove of: ', `${distPrefix}static`)
      if (!(fs.existsSync(generatedDistDir))) {
        // THROW ERROR?
        throw new Error('Could not find dist/static or static folder');
      }
    }

    let defaultIndexTemplate = ''
    let prodFolder = ''
  
    const indexProd = ''

    const isDev = !isProd
    const defaultMaxAge = isDev ? '' : '31536000'

    const manifest = ''

        let assetsRootDir: string[] = []
        let assetsRootDirsWithAssets: string[] = []
        const clientSrcDistDir = resolve(`${distPrefix}client`)
        // let assetsRootDir = clientSrcDistDir
        if (process.env.LAMBDA_TASK_ROOT || process.env.USE_STATIC && isProd) {
            assetsRootDir.push(generatedDistDir)
            assetsRootDirsWithAssets.push(`${generatedDistDir}/assets/`)
        }
        // for dev only?
        assetsRootDir.push(clientSrcDistDir)
        assetsRootDirsWithAssets.push(`${clientSrcDistDir}/assets/`)
        console.error('added of ', assetsRootDir)
        console.error('added of ', assetsRootDirsWithAssets)

        // fastify.use(require('compression')())
	console.error('REGISTERED OF :', clientSrcDistDir)
        fastify.register(FastifyEtag)
        fastify.register(FastifyStatic, {
            root: assetsRootDir,
            // `${assetsRootDir}`,
            prefix: `${PREFIX}`,
            acceptRanges: true,
            cacheControl: true,
            preCompressed: true,
            decorateReply: true,
            dotfiles: 'deny',
            etag: false,
            extensions: ['.png','.jpeg','woff','woff2','.css','.js'],
            immutable: true,
            index: false,
            list: false,
            lastModified: true,
            maxAge: defaultMaxAge,
            schemaHide: true,
            serve: true,
            wildcard: false,
            // wildcard: '*.{js,css,png,woff2}',
            // allowedPath: (path) => /\.(?:js|css|png|woff2)$/.test(path),
            /*
              setHeaders: (res, pathName) => {
                 res.setHeader('some-header', pathName)
              }
            */
        })

        fastify.register(FastifyStatic, {
            root: assetsRootDirsWithAssets,
            prefix: '/assets/',
            acceptRanges: true,
            cacheControl: true,
            preCompressed: true,
            decorateReply: false,
            dotfiles: 'deny',
            etag: false,
            index: false,
            list: false,
            extensions: ['.png','.jpeg','woff','woff2','.css','.js'],
            // immutable: true,
            // index: false,
            // list: true,
            lastModified: true,
            maxAge: defaultMaxAge,
            schemaHide: true,
            serve: true,
            /*
              setHeaders: (res, pathName) => {
                 res.setHeader('some-header', pathName)
              }
            */
       })

    // fastify.use('*', async (req: any, res: any)

    fastify.setNotFoundHandler((req: any, reply: any) => {
       // Complicated super secret business logic.

        reply.status(204)
        reply.send('')
        // reply.defaultNotFoundHandler(); // Use default one again
    });

    fastify.get('*', async (req: any, res: any) => {
        res.status(500)
    })

    return { fastify }
}

console.error('testa')
if (!isTest || config.dev) {
    console.error('testb')
    createServer().then(({ app }: any) =>
        fastify.listen(8080,'0.0.0.0', () => {
            console.log('http://0.0.0.0:8080')
        })
    )
}

// for test use
exports.createServer = createServer
console.error('STARTB');
