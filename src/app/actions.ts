import { amplifyClient } from './amplify-utils';

export async function generateRecipe(formData: FormData) {
  const ingredientsText = formData.get('ingredientsText')?.toString() || '';
  const ingredientsPrompt = formData.get('ingredientsPrompt')?.toString() || '';

  let ingredients = ingredientsText;
  if (ingredientsText && ingredientsPrompt) {
    ingredients = `${ingredientsText}: ${ingredientsPrompt}`;
  } else if (ingredientsPrompt) {
    ingredients = ingredientsPrompt;
  }

  const response = await amplifyClient.queries.askBedrock({
    ingredients: [ingredients],
  });

  const res = JSON.parse(response.data?.body!);
  const content = res.content[0].text;
  return content || '';
}
