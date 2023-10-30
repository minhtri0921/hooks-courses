import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [listCourses, setListCourses] = useState([])
  const [id, setId] = useState()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [coin, setCoin] = useState('')
  const [isEditting, setIsEditting] = useState(false)
  const [errName, setErrName] = useState('')
  const [errDescription, setErrDescription] = useState('')
  const [errCoin, setErrCoin] = useState('')

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`http://localhost:3001/courses`)
      setListCourses(result.data)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isEditting) {
      if (name && description && coin) {
        try {
          const formData = {
            name,
            description,
            coin
          }
          await axios({
            method: 'POST',
            url: 'http://localhost:3001/courses/add',
            data: formData
          })
          const newListCourses = [...listCourses, formData]
          setListCourses(newListCourses)
          setName('')
          setDescription('')
          setCoin('')
        } catch (err) {
          console.log('Lỗi khi thêm');
        }
      } else {
        if (name == '') {
          setErrName('Chưa nhập tên')
        }
        if (description == '') {
          setErrDescription('Chưa nhập mô tả')
        }
        if (coin == '') {
          setErrCoin('Chưa nhập giá sản phẩm')
        }
      }
    } else {
      const formData = {
        id,
        name,
        description,
        coin
      }
      await axios({
        method: 'PUT',
        url: 'http://localhost:3001/courses/edit',
        data: formData
      })
      const newListCoursesEdit = [...listCourses]
      const idx = newListCoursesEdit.findIndex((cs) => cs.id === id)
      newListCoursesEdit.splice(idx, 1, formData)
      setName('')
      setDescription('')
      setCoin('')
      setListCourses(newListCoursesEdit)
    }
  }

  const handleClickEdit = (course) => {
    setIsEditting(true)
    setName(course.name)
    setDescription(course.description)
    setCoin(course.coin)
    setId(course.id)
  }

  const handleDelete = async (course) => {
    const newListCourses = [...listCourses]
    const index = newListCourses.findIndex(cs => cs.id === course.id)
    const confirm = window.confirm('Bạn có muốn xóa ?')
    if (confirm === true) {
      await axios({
        method: 'DELETE',
        url: `http://localhost:3001/courses/delete/${course.id}`,
      })
      newListCourses.splice(index, 1)
      setListCourses(newListCourses)
    }
  }
  const handleOnBlur = (e) => {
    if (e.target.name == 'name') {
      if (!e.target.value) {
        setErrName('Thiếu tên khóa học')
      }
    } else if (e.target.name == 'coin') {
      if (!e.target.value) {
        setErrCoin('Thiếu giá sản phẩm')
      }
    } else if (e.target.name == 'description') {
      if (!e.target.value) {
        setErrDescription('Thiếu mô tả')
      }
    }

  }
  const handleOnInput = (e) => {
    if (e.target.name == 'name') {
      if (e.target.value) {
        setErrName('')
      }
    }
    if (e.target.name == 'description') {
      if (e.target.value) {
        setErrDescription('')
      }
    }
    if (e.target.name == 'coin') {
      if (e.target.value) {
        setErrCoin('')
      }
    }
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Tên</label>
        <input value={name} type='text' name='name'
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => handleOnBlur(e)}
          onInput={(e) => handleOnInput(e)}
        />
        <span style={{ color: 'red' }}>{errName}</span>
        <br />
        <label>Mô tả</label>
        <input
          value={description} type='text' name='description'
          onChange={(e) => setDescription(e.target.value)}
          onBlur={(e) => handleOnBlur(e)}
          onInput={(e) => handleOnInput(e)}
        />
        <span style={{ color: 'red' }}>{errDescription}</span>
        <br />
        <label>Giá</label>
        <input
          value={coin} type='text' name='coin'
          onChange={(e) => setCoin(e.target.value)}
          onBlur={(e) => handleOnBlur(e)}
          onInput={(e) => handleOnInput(e)}
        />
        <span style={{ color: 'red' }}>{errCoin}</span>
        <br />
        <button type='submit'>{isEditting ? 'Sửa' : 'Thêm'}</button>
      </form>
      <ul>
        {listCourses.map((course, idx) => (
          <li key={idx}>
            <h2>{course.name}</h2>
            <p><strong>Mô tả : {course.description}</strong></p>
            <p>Giá : {course.coin}</p>
            <button onClick={() => handleClickEdit(course)}>Sửa</button>
            <button onClick={() => handleDelete(course)}>Xóa</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
