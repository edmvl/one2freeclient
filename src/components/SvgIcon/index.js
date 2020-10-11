import React from 'react'

const Icon = ({ name, ...rest }) => {
  const ImportedIconRef = React.useRef(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    const importIcon = async () => {
      try {
        ImportedIconRef.current = (await import(`./${name}.svg`)).ReactComponent
      } catch (err) {
        throw err
      } finally {
        setLoading(false)
      }
    }
    importIcon()
  }, [name])

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef
    return <ImportedIcon {...rest} />
  }

  return null
}
export default Icon
