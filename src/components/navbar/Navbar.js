import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-bootstrap";

function Navbar() {
  return (
    <div>
      <nav>
        <Navbar>
          <img src="logo-quan-cafe-8.png" alt="" />
        </Navbar>
        <Link>
          <AiOutlineHome /> Trang chủ
        </Link>
        <Link> giới thiệu</Link>
        <Link> Thực đơn</Link>
        <Link> Nguyên liệu</Link>
        <Link> Liên hệ</Link>
        <Link> Tin tức</Link>
        <Link> Tìm kiếm</Link>
      </nav>
    </div>
  );
}

export default Navbar;
