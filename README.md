<div align="center">

<img src="./logos.png" width="320" alt="Logos" />

# Plataforma Social con Supabase

Muy cool, hecha con React Native y TypeScript

</div>

## ❗️ Disclaimer

Esto es un proyecto de prueba que he hecho siguiendo el tutorial de [Jose Dev](https://www.youtube.com/watch?v=WOumYKSam-0).

Ha sido hecho siguiendo los siguientes pasos:

1. `npx create-expo-app supabook --template`
2. elegir `navigation with typescript`

Si muchas veces el código parece no funcionar, prueba a hacer: `sudo npm cache clear --force`.

## 🔧 Setup

Para hacer funcionar el proyecto con supabase and .env, tienes que instalar las siguientes dependencias:

`npm i react-native-url-polyfill`

`npm i react-native-dotenv`

También hay que añadir un par de cosas al `tsconfig.json` y al `babel.config.js` además de crear el `./src/types/env.d.tsx`.

Tuve que añadir lo siguiente en el`index.ts` del root:

```
import "expo-router/entry";
import "react-native-url-polyfill/auto";
```

## Utils

rnfs --> snippet React Native Functional Component with Styles
cmd + shift + a --> toggle light and dark mode

## Recomendación: Añadir supabase CLI y generar tipos de forma automática

`npm install supabase --save-dev`

`npx supabase login`

`npx supabase gen types typescript --project-id [ID-first-part-of-supabase-url] > ./src/db_types.ts`

Cuando hablamos de ID-first-part-of-supabase-url, nos referimos a la primera parte de la SUPABASE_URL. Vamos a tener que correr este comando cada vez que hagamos un cambio en la database.

👨‍💻 Paquetes extra

@react-native-async-storage/async-storage --> Para persistir la session

En caso de dudas, es buena idea echarle un vistazo a las partes 7 y 8 del tutorial, que es dnd se habla de authenticación y permisos.
https://www.youtube.com/watch?v=Oc4lldpq0-U&t=3s
