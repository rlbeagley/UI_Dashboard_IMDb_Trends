import { useEffect, useState } from 'react'
import Papa from 'papaparse'

export function useParseData(filePath) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Papa.parse(filePath, {
      download: true,
      header: true, // first row becomes object keys
      dynamicTyping: true, // "123" becomes 123
      skipEmptyLines: true,
      chunk: function(results) { // since data is large
        setRows(prev => prev.concat(results.data))
      },
      complete: () => {
        setLoading(false)
      },
      error: (err) => {
        setError(err)
        setLoading(false)
      },
    })
  }, [filePath])

  return { rows, loading, error }
}