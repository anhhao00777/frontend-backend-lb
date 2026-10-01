const RemoveVietnameseTones = (str) => {
    if (!str) return '';
    return str
        .normalize('NFD') // Tách ký tự gốc và dấu
        .replace(/[\u0300-\u036f]/g, '') // Xóa các dấu thanh/dấu phụ
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'd')
        .toLowerCase()
        .trim();
};
module.exports = RemoveVietnameseTones;
