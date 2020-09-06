const getPictureUrl = (type, picPathVariations) => {
  const resourceUrls = 'https://api.test.one2free.ru'
  return resourceUrls + picPathVariations[type]
}
export default getPictureUrl
