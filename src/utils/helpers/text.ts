export const createMarkup = (html: string) => {
  return { __html: html }
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
