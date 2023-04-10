# Social Platform with Supabase

We are starting https://www.youtube.com/watch?v=WOumYKSam-0

It was done after using

1. npx create-expo-app supabook --template
2. choose navigation with typescript

I had to clean all the cache to make this work
sudo npm cache clear --force

## Setup

To make it work with supabase and .env I had to install some dependencies:

npm i react-native-url-polyfill
npm i react-native-dotenv

Take a look at what I had to do in the tsconfig.json and the babel.config.js (in addition to create env.d.tsx).

I had to add the polyfill in the top part of my project, in the entry (index.ts in the root):

import "expo-router/entry";
import "react-native-url-polyfill/auto";

## Utils

rnfs - snippet
React Native Functional Component with Styles

## Add supabase CLI and generate types automatically

npm install supabase --save-dev

npx supabase login

npx supabase gen types typescript --project-id [ID-first-part-of-supabase-url] > ./src/db_types.ts
