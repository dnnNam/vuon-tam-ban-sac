import type { Team, Tile, QuestionBank } from "./types";

export const WIN_LAPS = 2;
export const TOTAL_TILES = 16;

export const INITIAL_TEAMS: Team[] = [
  { id: 1, name: 'Nhóm 1', color: 'bg-red-500', character: '🐉', position: 0, laps: 0 },
  { id: 2, name: 'Nhóm 2', color: 'bg-blue-500', character: '🐢', position: 0, laps: 0 },
  { id: 3, name: 'Nhóm RBL', color: 'bg-green-500', character: '🦢', position: 0, laps: 0 },
  { id: 4, name: 'Nhóm 4', color: 'bg-yellow-400', character: '🥁', position: 0, laps: 0 },
  { id: 5, name: 'Nhóm 5', color: 'bg-purple-500', character: '🎋', position: 0, laps: 0 },
  { id: 6, name: 'Nhóm 6', color: 'bg-orange-500', character: '🌴', position: 0, laps: 0 },
  { id: 7, name: 'Nhóm 7', color: 'bg-cyan-500', character: '⚓', position: 0, laps: 0 },
];

// Ô START (id 0, 8) là ô an toàn, không có câu hỏi, không bị đá khi đội khác giẫm vào.
// Các ô còn lại là ô QUESTION - mỗi ô ứng với 1 bộ câu hỏi (3 câu, 1 câu / vòng).
export const BOARD_TILES: Tile[] = [
  { id: 0, name: 'VẠCH XUẤT PHÁT', type: 'START', gridCol: 1, gridRow: 1 },
  { id: 1, name: 'Phở Việt Nam', type: 'QUESTION', gridCol: 2, gridRow: 1 },
  { id: 2, name: 'Sóng Ngầm: Black Friday', type: 'QUESTION', gridCol: 3, gridRow: 1 },
  { id: 3, name: 'Áo Dài Truyền Thống', type: 'QUESTION', gridCol: 4, gridRow: 1 },
  { id: 4, name: 'Mất Gốc Văn Hóa', type: 'QUESTION', gridCol: 5, gridRow: 1 },
  { id: 5, name: 'Nhạc Cụ Dân Tộc', type: 'QUESTION', gridCol: 5, gridRow: 2 },
  { id: 6, name: 'Sóng Ngầm: Phim Hollywood', type: 'QUESTION', gridCol: 5, gridRow: 3 },
  { id: 7, name: 'Cà Phê Sữa Đá', type: 'QUESTION', gridCol: 5, gridRow: 4 },
  { id: 8, name: 'TRẠM DỪNG CHÂN', type: 'START', gridCol: 5, gridRow: 5 },
  { id: 9, name: 'Game Thuần Việt', type: 'QUESTION', gridCol: 4, gridRow: 5 },
  { id: 10, name: 'Sóng Ngầm: Mạng Xã Hội', type: 'QUESTION', gridCol: 3, gridRow: 5 },
  { id: 11, name: 'Múa Rối Nước', type: 'QUESTION', gridCol: 2, gridRow: 5 },
  { id: 12, name: 'Khủng Hoảng Kinh Tế', type: 'QUESTION', gridCol: 1, gridRow: 5 },
  { id: 13, name: 'Di Tích Lịch Sử', type: 'QUESTION', gridCol: 1, gridRow: 4 },
  { id: 14, name: 'Sóng Ngầm: Nhạc K-Pop', type: 'QUESTION', gridCol: 1, gridRow: 3 },
  { id: 15, name: 'Bánh Mì', type: 'QUESTION', gridCol: 1, gridRow: 2 },
];

// Bộ câu hỏi: mỗi ô có 3 câu (vòng 1 / vòng 2 / vòng 3), độ khó tăng dần.
// GM có thể tự chỉnh sửa nội dung câu hỏi tại đây.


export const QUESTION_BANK: QuestionBank = {
  1: [
    { question: 'Theo giáo trình Kinh tế chính trị Mác - Lênin, hội nhập kinh tế quốc tế là quá trình:', options: ['Tách nền kinh tế quốc gia khỏi nền kinh tế thế giới', 'Gắn kết nền kinh tế quốc gia với nền kinh tế thế giới', 'Chỉ nhập khẩu hàng hóa từ nước ngoài', 'Xóa bỏ hoàn toàn hoạt động sản xuất trong nước'], correctIndex: 1 },
    { question: 'Nhận định nào đúng nhất về tác động của hội nhập đối với văn hóa?', options: ['Chỉ đem lại lợi ích', 'Chỉ gây ra tác động tiêu cực', 'Vừa tạo cơ hội phát triển, vừa đặt ra thách thức', 'Không gây ra bất kỳ ảnh hưởng nào'], correctIndex: 2 }
  ],
  2: [
    { question: 'Hội nhập kinh tế quốc tế được thực hiện dựa trên cơ sở nào?', options: ['Chia sẻ lợi ích và tuân thủ các chuẩn mực quốc tế chung', 'Từ bỏ lợi ích quốc gia', 'Phụ thuộc hoàn toàn vào các nước phát triển', 'Không tham gia các tổ chức kinh tế quốc tế'], correctIndex: 0 },
    { question: 'Phương châm quan trọng của Việt Nam trong quá trình hội nhập là:', options: ['Hội nhập bằng mọi giá', 'Hòa nhập nhưng không hòa tan', 'Đóng cửa để bảo vệ văn hóa', 'Ưu tiên hoàn toàn văn hóa nước ngoài'], correctIndex: 1 }
  ],
  3: [
    { question: 'Nội dung nào sau đây là biểu hiện của hội nhập kinh tế quốc tế?', options: ['Đóng cửa thị trường trong nước', 'Hạn chế tiếp nhận vốn đầu tư nước ngoài', 'Tham gia vào chuỗi cung ứng toàn cầu', 'Không trao đổi công nghệ với nước ngoài'], correctIndex: 2 },
    { question: '“Hòa nhập” được hiểu là:', options: ['Tích cực tham gia hệ thống kinh tế thế giới', 'Từ bỏ bản sắc và lợi ích dân tộc', 'Không tham gia các tổ chức quốc tế', 'Hạn chế tiếp cận vốn và công nghệ'], correctIndex: 0 }
  ],
  4: [
    { question: 'Một trong những nguyên nhân khiến hội nhập kinh tế quốc tế trở thành tất yếu khách quan là:', options: ['Xu thế toàn cầu hóa kinh tế', 'Sự biến mất của thương mại quốc tế', 'Các quốc gia có thể tự cung cấp mọi nguồn lực', 'Nhu cầu đóng cửa nền kinh tế'], correctIndex: 0 },
    { question: '“Không hòa tan” có nghĩa là:', options: ['Từ chối mọi sản phẩm văn hóa nước ngoài', 'Bảo vệ bản sắc, độc lập và quyền tự quyết định chiến lược phát triển', 'Không trao đổi kinh tế với quốc gia khác', 'Chỉ sử dụng công nghệ sản xuất trong nước'], correctIndex: 1 }
  ],
  5: [
    { question: 'Toàn cầu hóa kinh tế làm gia tăng điều gì giữa các quốc gia?', options: ['Sự cô lập và tách biệt', 'Sự liên kết và phụ thuộc lẫn nhau', 'Sự độc quyền tuyệt đối', 'Sự khác biệt về hệ thống chính trị'], correctIndex: 1 },
    { question: 'Mối quan hệ giữa độc lập, tự chủ và hội nhập quốc tế là:', options: ['Mối quan hệ hoàn toàn đối lập', 'Mối quan hệ biện chứng, hỗ trợ và tạo tiền đề cho nhau', 'Hai vấn đề không liên quan', 'Hội nhập luôn làm mất độc lập, tự chủ'], correctIndex: 1 }
  ],
  6: [
    { question: 'Đối với các nước đang phát triển như Việt Nam, hội nhập kinh tế quốc tế tạo cơ hội:', options: ['Tiếp cận vốn, khoa học, công nghệ và kinh nghiệm', 'Không cần phát triển sản xuất trong nước', 'Loại bỏ hoàn toàn sự cạnh tranh', 'Phụ thuộc lâu dài vào hàng nhập khẩu'], correctIndex: 0 },
    { question: 'Điều gì có thể xảy ra khi hội nhập quá nhanh trong khi năng lực tự chủ còn yếu?', options: ['Hiệu quả hội nhập luôn được nâng cao', 'Quốc gia có nguy cơ bị lệ thuộc và mất khả năng tự quyết định', 'Năng lực cạnh tranh tự động tăng lên', 'Bản sắc văn hóa tự động được bảo vệ'], correctIndex: 1 }
  ],
  7: [
    { question: 'Hội nhập kinh tế quốc tế giúp các nước đang phát triển:', options: ['Gia tăng nguy cơ tụt hậu', 'Rút ngắn khoảng cách với các nước tiên tiến', 'Từ bỏ quá trình công nghiệp hóa', 'Hạn chế tạo việc làm mới'], correctIndex: 1 },
    { question: 'Để thực hiện đúng phương châm “hòa nhập nhưng không hòa tan”, Việt Nam cần:', options: ['Nhận thức rõ thời cơ và thách thức của hội nhập', 'Tiếp nhận toàn bộ văn hóa nước ngoài', 'Từ bỏ các chính sách bảo vệ văn hóa', 'Không xây dựng chiến lược hội nhập'], correctIndex: 0 }
  ],
  8: [
    { question: 'Theo quan điểm của chủ nghĩa duy vật lịch sử, kinh tế được xem là:', options: ['Cơ sở tác động đến đời sống văn hóa', 'Một lĩnh vực không liên quan đến văn hóa', 'Yếu tố hoàn toàn phụ thuộc vào văn hóa', 'Hoạt động chỉ liên quan đến sản xuất vật chất'], correctIndex: 0 },
    { question: 'Sức mạnh mềm là khả năng một quốc gia:', options: ['Buộc quốc gia khác tuân theo bằng sức mạnh quân sự', 'Tạo ảnh hưởng thông qua sức hấp dẫn của văn hóa, giá trị và hình ảnh quốc gia', 'Kiểm soát các nước khác bằng cấm vận', 'Áp đặt chính sách bằng biện pháp cưỡng chế'], correctIndex: 1 }
  ],
  9: [
    { question: 'Khi quan hệ kinh tế giữa các quốc gia gia tăng, điều gì thường diễn ra cùng với sự giao lưu hàng hóa?', options: ['Sự chấm dứt giao lưu văn hóa', 'Sự tiếp cận các giá trị văn hóa và lối sống nước ngoài', 'Sự loại bỏ các phương tiện truyền thông', 'Sự đóng cửa của thị trường nội địa'], correctIndex: 1 },
    { question: 'Nội dung nào sau đây thuộc công cụ của sức mạnh mềm?', options: ['Phim ảnh, âm nhạc và hình ảnh quốc gia', 'Vũ khí và quân đội', 'Trừng phạt kinh tế', 'Biện pháp cưỡng chế chính trị'], correctIndex: 0 }
  ],
  10: [
    { question: 'Những sản phẩm như Netflix, K-Pop và TikTok phản ánh:', options: ['Sự chi phối của những quốc gia và doanh nghiệp có tiềm lực kinh tế mạnh', 'Sự biến mất của các công ty xuyên quốc gia', 'Việc văn hóa không chịu ảnh hưởng của kinh tế', 'Sự phát triển độc lập hoàn toàn của văn hóa'], correctIndex: 0 },
    { question: 'Hàn Quốc đã xây dựng sức mạnh mềm nổi bật thông qua:', options: ['K-Pop và phim ảnh Hàn Quốc', 'Việc đóng cửa thị trường văn hóa', 'Hạn chế hoạt động của ngành sáng tạo', 'Không sử dụng các nền tảng quốc tế'], correctIndex: 0 }
  ],
  11: [
    { question: 'Tác động tích cực của hội nhập kinh tế quốc tế đối với văn hóa là:', options: ['Làm mất hoàn toàn văn hóa dân tộc', 'Tạo điều kiện tiếp thu tinh hoa văn hóa thế giới', 'Loại bỏ những sản phẩm văn hóa trong nước', 'Làm giảm hiểu biết của người dân về thế giới'], correctIndex: 1 },
    { question: 'Trong giai đoạn nhận thức về sức mạnh mềm, Chính phủ Hàn Quốc đã:', options: ['Đầu tư vào phim ảnh, âm nhạc và hỗ trợ nhân tài sáng tạo', 'Ngừng đào tạo ca sĩ, diễn viên', 'Cấm doanh nghiệp văn hóa hợp tác quốc tế', 'Chỉ tập trung phát triển nông nghiệp'], correctIndex: 0 }
  ],
  12: [
    { question: 'Hội nhập quốc tế có thể giúp sản phẩm văn hóa Việt Nam:', options: ['Chỉ được sử dụng trong phạm vi gia đình', 'Có cơ hội tiếp cận thị trường thế giới', 'Không cần cải thiện chất lượng', 'Tránh hoàn toàn sự cạnh tranh quốc tế'], correctIndex: 1 },
    { question: 'Một lợi ích kinh tế mà sức mạnh mềm mang lại cho Hàn Quốc là:', options: ['Thúc đẩy du lịch và tạo thêm việc làm', 'Làm giảm xuất khẩu hàng hóa', 'Hạn chế sự phát triển của doanh nghiệp', 'Làm giảm hình ảnh quốc gia'], correctIndex: 0 }
  ],
  13: [
    { question: 'Nguy cơ “xâm lăng văn hóa” có thể xuất phát từ:', options: ['Sự cân bằng tuyệt đối về nguồn lực kinh tế', 'Sự bất cân xứng về sức mạnh kinh tế giữa các quốc gia', 'Sự phát triển mạnh của doanh nghiệp văn hóa Việt Nam', 'Việc người trẻ chỉ sử dụng sản phẩm trong nước'], correctIndex: 1 },
    { question: 'Một nguyên nhân khiến sức mạnh mềm của Việt Nam còn hạn chế là:', options: ['Thiếu chiến lược dài hạn và năng lực cạnh tranh quốc tế còn yếu', 'Có quá nhiều thương hiệu văn hóa quốc tế', 'Nguồn lực đầu tư cho sáng tạo quá lớn', 'Sản phẩm văn hóa Việt đã chiếm lĩnh toàn cầu'], correctIndex: 0 }
  ],
  14: [
    { question: 'Vì sao sản phẩm văn hóa nước ngoài thường thu hút giới trẻ?', options: ['Được quảng bá quy mô lớn, có chất lượng cao và gắn với lối sống hiện đại', 'Không được đầu tư về nội dung', 'Không xuất hiện trên các nền tảng số', 'Có giá trị sử dụng thấp hơn sản phẩm trong nước'], correctIndex: 0 },
    { question: 'Ở cấp độ doanh nghiệp, giải pháp xây dựng sức mạnh mềm của Việt Nam là:', options: ['Đầu tư công nghệ, đào tạo nhân lực và hợp tác quốc tế', 'Giảm chất lượng sản phẩm để tiết kiệm chi phí', 'Không sử dụng thiết bị sản xuất hiện đại', 'Hạn chế xây dựng thương hiệu sáng tạo Việt Nam'], correctIndex: 0 }
  ],
  15: [
    { question: 'Thuật toán của các nền tảng số xuyên biên giới thường ưu tiên:', options: ['Nội dung có khả năng thu hút nhiều lượt xem và chi tiêu', 'Chỉ những sản phẩm văn hóa truyền thống', 'Chỉ sản phẩm do Nhà nước sản xuất', 'Nội dung không có người xem'], correctIndex: 0 },
    { question: 'Giới trẻ Việt Nam có thể góp phần phát triển văn hóa dân tộc bằng cách:', options: ['Ủng hộ sản phẩm văn hóa Việt và quảng bá ra thế giới', 'Từ chối mọi sản phẩm do người Việt sáng tạo', 'Chỉ sử dụng sản phẩm văn hóa nước ngoài', 'Không tham gia vào các hoạt động sáng tạo'], correctIndex: 0 }
  ]
};