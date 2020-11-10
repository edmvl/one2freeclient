const getPictureUrl = (type, picPathVariations = {}) => {
  const resourceUrls = 'https://api.one2free.ru'
  return resourceUrls + picPathVariations[type]
}
export default getPictureUrl
