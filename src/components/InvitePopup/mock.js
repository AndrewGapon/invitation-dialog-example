const names = [
  'John Wick',
  'Bruce Wayne',
  'Jose Galdino',
  'John Doe',
  'Sarah Conor',
  'Bart Simpson',
  'John Johnson',
]

export const getRandomName = () => {
  const index = Math.trunc(Math.random() * names.length)

  return names[index]
}
