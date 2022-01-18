const APIKey = '9588824e18f1183fb5239e39'

const getUrl = coinToConvert => `https://v6.exchangerate-api.com/v6/${APIKey}/latest/${coinToConvert}`

const fetchData = async url => {
  try {
  response = await fetch(url)

  if(!response.ok) {
    throw new Error('Não foi possível recuperar os dados.')
  }

  return response.json()

} catch(error) {
    alert(`${error.title}:${error.message}`)
  }
}

const getConvertedCoin = coinToConvert => fetchData(getUrl(coinToConvert))
