'use client';

import React, { FormEvent, useState } from 'react';
import { Card } from '@aws-amplify/ui-react';
import { generateRecipe } from './actions';

export default function Home() {
  const [result, setResult] = useState<string>('');
  const [loading, setloading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setloading(true);
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const data = await generateRecipe(formData);
      const recipe = typeof data === 'string' ? data : 'No data returned';
      setloading(false);
      setResult(recipe);
    } catch (e) {
      alert(`An error occurred: ${e}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center  p-24  m-auto ">
      <div className=" pb-10 mx-auto text-center flex flex-col items-start -center max-w-3xl">
        <h1 className=" text-4xl  font-bold  text-gray-900 sm:text-6xl ">
          <span className=" text-blue-600"> 凛レシピ AI </span>
          <p className=" mt-10 font-medium   text-lg  max-w-prose text-gray-900 ">
            食材や料理名を入力すると、レシピを生成します。
          </p>
        </h1>
      </div>

      <section className="   w-1/2  mx-auto ">
        <form
          onSubmit={onSubmit}
          className=" p-4 flex flex-col items-center gap-4  max-w-full mx-auto"
        >
          <input
            type="text"
            id="ingredientsPrompt"
            name="ingredientsPrompt"
            required
            placeholder="プロンプト（料理の難易度などを記入してください）"
            className="border border-black  text-gray-900 p-4 rounded-lg max-w-full w-full text-xl "
          />
          <input
            type="text"
            id="ingredientsText"
            name="ingredientsText"
            required
            placeholder="食材や料理名を打ち込んでください"
            className="border border-black  text-gray-900 p-4 rounded-lg max-w-full w-full text-xl "
          />
          <button
            type="submit"
            className="  text-white p-2 rounded-lg bg-blue-500   w-1/2 text-xl  "
          >
            レシピを生成
          </button>
        </form>
      </section>
      {loading ? (
        <div className="flex flex-col items-center gap-4 w-1/2  mx-auto ">
          <h2 className="m-10 font-medium   text-xl   max-w-prose text-blue-600 ">
            レシピを生成しています...
          </h2>
        </div>
      ) : (
        <div>
          {result ? (
            <section className="    mt-10 mx-auto  border border-black  bg-gray-50  rounded-xl     ">
              <Card className=" p-4 flex flex-col items-center gap-4  max-w-full mx-auto text-xl  font-semibold    ">
                <h2 className="whitespace-pre-wrap">{result}</h2>
              </Card>
            </section>
          ) : null}
        </div>
      )}
    </main>
  );
}
