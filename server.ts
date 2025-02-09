import 'zone.js/node';
import express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { ngExpressEngine } from '@nguniversal/express-engine';
import bootstrap from './src/main.server';

const app = express();
const distFolder = join(process.cwd(), 'dist/angular-cms/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html'))
  ? 'index.original.html'
  : 'index.html';

app.engine('html', ngExpressEngine({ bootstrap: () => bootstrap }));
app.set('view engine', 'html');
app.set('views', distFolder);

app.use(express.static(distFolder, { maxAge: '1y' }));

app.get('*', (req: express.Request, res: express.Response) => {
  res.render(indexHtml, { req });
});

const PORT = process.env['PORT'] || 4000;
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});