/* ============================================================================ 
 * COMPONENT: VÙNG KÍN & BẢO MẬT (PrivateNotes.tsx) 
 * Author: [Điền tên Frontend Dev] 
 *  
 * [LƯU Ý]: Sử dụng lại phần lớn UI từ Notes.tsx. Thêm state isUnlocked để làm "cửa bảo vệ". 
 * ============================================================================ 
 */ 
import { useState } from 'react';

// Khai báo kiểu dữ liệu cho Ghi chú Riêng tư
interface PrivateNoteItem {
  id: number | string | null;
  title: string;
  content: string;
}

function PrivateNotes() { 
  /* ======================================================================== 
     VÙNG 1: STATE (Trạng thái) 
     ======================================================================== */ 
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false); // Cờ khóa màn hình 
  const [passwordInput, setPasswordInput] = useState<string>(''); 
  const [notes, setNotes] = useState<PrivateNoteItem[]>([]); 
  const [formData, setFormData] = useState<PrivateNoteItem>({ id: null, title: '', content: '' }); 

  /* ======================================================================== 
     VÙNG 2: LOGIC (Xác thực & Fetch Data) 
     ======================================================================== */ 
  // Kiểm tra mật khẩu 
  const handleLogin = () => { 
    if (!passwordInput) {
      alert("Vui lòng nhập mật khẩu!");
      return;
    }

    fetch('http://localhost:5000/api/private/auth', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ password: passwordInput }) 
    }) 
      .then(res => res.json()) 
      .then(data => { 
        if (data.success) { 
          setIsUnlocked(true); // Mở khóa 
          fetchPrivateNotes(); // Lấy dữ liệu 
        } else { 
          alert("Sai mật khẩu, vui lòng thử lại!"); 
          setPasswordInput(''); 
        } 
      })
      .catch(err => console.error("Lỗi xác thực:", err)); 
  }; 

  const fetchPrivateNotes = () => { 
    fetch('http://localhost:5000/api/private/notes') 
      .then(res => res.json()) 
      .then((data: PrivateNoteItem[]) => setNotes(data))
      .catch(err => console.error("Lỗi tải ghi chú riêng tư:", err)); 
  }; 

  const handleSave = () => { 
    if (!formData.title.trim()) {
      alert("Vui lòng nhập tiêu đề bí mật!");
      return;
    }

    fetch('http://localhost:5000/api/private/notes', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ title: formData.title, content: formData.content }) 
    })
      .then(res => res.json())
      .then(() => { 
        fetchPrivateNotes(); 
        setFormData({ id: null, title: '', content: '' }); 
      })
      .catch(err => console.error("Lỗi lưu ghi chú bí mật:", err)); 
  }; 

  /* ======================================================================== 
     VÙNG 3: RENDER (Hiển thị) 
     ======================================================================== */ 
  // 3.1. Nếu chưa mở khóa -> Render màn hình nhập Pass 
  if (!isUnlocked) { 
    return ( 
      <div style={{ padding: '50px', textAlign: 'center' }}> 
        <h2>Khu vực Bảo mật</h2> 
        <p>Vui lòng nhập mật khẩu để truy cập</p> 
        <input  
          type="password"  
          value={passwordInput}  
          onChange={(e) => setPasswordInput(e.target.value)}  
          placeholder="Nhập mật khẩu..." 
          style={{ padding: '8px', marginRight: '10px' }}
        /> 
        <button onClick={handleLogin} style={{ padding: '8px 16px' }}>Mở khóa</button> 
      </div> 
    ); 
  } 

  // 3.2. Nếu đã mở khóa -> Render giao diện Note 
  return ( 
    <div style={{ padding: '20px', backgroundColor: '#ffebee' }}> 
      <h2 style={{ color: 'red' }}>Khu vực Ghi chú Riêng tư</h2> 

      {/* Form nhập liệu */} 
      <div style={{ border: '1px solid red', padding: '10px', marginBottom: '20px' }}> 
        <input  
          placeholder="Tiêu đề bí mật" 
          value={formData.title}  
          onChange={e => setFormData({ ...formData, title: e.target.value })}  
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} 
        /> 
        <textarea  
          placeholder="Nội dung bí mật" 
          value={formData.content}  
          onChange={e => setFormData({ ...formData, content: e.target.value })}  
          style={{ display: 'block', width: '100%', height: '80px', marginBottom: '10px', padding: '8px' }} 
        /> 
        <button onClick={handleSave} style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px', border: 'none', cursor: 'pointer' }}>
          Lưu bí mật
        </button> 
      </div> 

      {/* Danh sách ghi chú riêng tư */} 
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}> 
        {notes.length === 0 && <p>Chưa có ghi chú bí mật nào.</p>}
        {notes.map((note: PrivateNoteItem) => ( 
          <div key={note.id} style={{ border: '1px solid red', padding: '15px', borderRadius: '5px', backgroundColor: '#fff' }}> 
            <h4 style={{ color: 'red', margin: '0 0 10px 0' }}>{note.title}</h4> 
            <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p> 
          </div> 
        ))} 
      </div> 
    </div> 
  ); 
} 

export default PrivateNotes;