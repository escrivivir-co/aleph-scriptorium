import * as readline from 'readline';
import { catalog, CatalogKeys } from './catalog';

async function bootstrap() {
  const args = process.argv.slice(2);
  let appName = args[0] as CatalogKeys | undefined;

  const availableApps = Object.keys(catalog) as CatalogKeys[];

  if (!appName || !availableApps.includes(appName)) {
    console.log('\n📦 Network-Engine App Catalog');
    console.log('-------------------------------');
    availableApps.forEach((key, i) => {
      console.log(`[${i + 1}] ${key} - ${catalog[key].app.manifest.name}`);
    });
    console.log('-------------------------------');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    appName = await new Promise<CatalogKeys>((resolve) => {
      rl.question('\nEnter the name of the app to launch: ', (answer) => {
        rl.close();
        resolve(answer.trim() as CatalogKeys);
      });
    });
  }

  if (!availableApps.includes(appName)) {
    console.error(`\n[!] Error: App '${appName}' not found in catalog.`);
    process.exit(1);
  }

  const descriptor = catalog[appName];
  
  // Ocultamos explícitamente cualquier type error de instanciación genérica
  // sabiendo que el catálogo garantiza que descriptor.app y descriptor.provideConfig()
  // encajan perfectamente.
  const app = descriptor.app as any;
  const config = await descriptor.provideConfig();
  
  app.init(config);
  await app.run();
}

bootstrap().catch(err => {
  console.error('\n[!] Fatal Error during bootstrap:', err);
  process.exit(1);
});
