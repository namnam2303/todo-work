# TodoWork Project

## Giới thiệu

TodoWork là một ứng dụng quản lý dự án đơn giản với các chức năng đăng nhập, quản lý dự án và chi tiết các đầu việc trong dự án. Ứng dụng này sử dụng Spring Boot cho backend và React với Redux cho frontend.

## Tính năng

- Đăng ký và đăng nhập người dùng
- Quản lý dự án (tạo, cập nhật, xóa)
- Quản lý task trong backlog của dự án

## Công nghệ sử dụng

### Backend

- Java 17
- Spring Boot
- Spring Security
- JPA/Hibernate
- MySQL

### Frontend

- React
- Redux
- Redux Thunk
- Axios
- Bootstrap
- React Router

## API Chính

### Project API
- **Tạo dự án**: `POST /api/project`
- **Lấy dự án theo ID**: `GET /api/project/{projectId}`
- **Lấy tất cả dự án**: `GET /api/project/all`
- **Xóa dự án**: `DELETE /api/project/{projectId}`
- **Cập nhật dự án**: `PUT /api/project/{projectId}`

### Backlog API
- **Thêm task vào backlog**: `POST /api/backlog/{projectIdentifier}`
- **Lấy tất cả tasks trong backlog**: `GET /api/backlog/{projectIdentifier}`
- **Lấy task theo sequence**: `GET /api/backlog/{projectIdentifier}/{task_sequence}`
- **Cập nhật task**: `PUT /api/backlog/{task_sequence}`
- **Xóa task**: `DELETE /api/backlog/{task_sequence}`

### User API
- **Đăng nhập**: `POST /api/auth/login`
- **Đăng ký**: `POST /api/auth/register`

## Yêu cầu hệ thống

- Java 17
- Node.js và npm
- MySQL

Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với tôi qua email: phuongnam23032000@gmail.com
