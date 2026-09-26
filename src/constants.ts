import type { Team, Tile, QuestionBank } from "./types";

export const WIN_LAPS = 2;
export const TOTAL_TILES = 16;

export const INITIAL_TEAMS: Team[] = [
  {
    id: 1,
    name: "Nhóm 1",
    color: "bg-red-500",
    character: "🐉",
    position: 0,
    laps: 0,
  },
  {
    id: 2,
    name: "Nhóm 2",
    color: "bg-blue-500",
    character: "🐢",
    position: 0,
    laps: 0,
  },

  {
    id: 4,
    name: "Nhóm 4",
    color: "bg-yellow-400",
    character: "🥁",
    position: 0,
    laps: 0,
  },
  {
    id: 5,
    name: "Nhóm 5",
    color: "bg-purple-500",
    character: "🎋",
    position: 0,
    laps: 0,
  },
  {
    id: 6,
    name: "Nhóm 6",
    color: "bg-orange-500",
    character: "🌴",
    position: 0,
    laps: 0,
  },
  {
    id: 7,
    name: "Nhóm 7",
    color: "bg-cyan-500",
    character: "⚓",
    position: 0,
    laps: 0,
  },
];

// Ô START (id 0, 8) là ô an toàn, không có câu hỏi, không bị đá khi đội khác giẫm vào.
// Các ô còn lại là ô QUESTION - mỗi ô ứng với 1 bộ câu hỏi (2 câu, 1 câu / vòng).
// Chủ đề: Tư tưởng Hồ Chí Minh về "Nhà nước trong sạch, vững mạnh"
// (Kiểm soát quyền lực nhà nước & Phòng, chống tiêu cực trong Nhà nước - Giáo trình, tr.86-90)
export const BOARD_TILES: Tile[] = [
  { id: 0, name: "VẠCH XUẤT PHÁT", type: "START", gridCol: 1, gridRow: 1 },
  {
    id: 1,
    name: "Vì Sao Phải Kiểm Soát",
    type: "QUESTION",
    gridCol: 2,
    gridRow: 1,
  },
  { id: 2, name: "Vai Trò Của Đảng", type: "QUESTION", gridCol: 3, gridRow: 1 },
  {
    id: 3,
    name: "Điều Kiện Kiểm Soát Tốt",
    type: "QUESTION",
    gridCol: 4,
    gridRow: 1,
  },
  { id: 4, name: "Hiến Pháp 1946", type: "QUESTION", gridCol: 5, gridRow: 1 },
  {
    id: 5,
    name: "Nhân Dân Kiểm Soát",
    type: "QUESTION",
    gridCol: 5,
    gridRow: 2,
  },
  {
    id: 6,
    name: "Đặc Quyền, Đặc Lợi",
    type: "QUESTION",
    gridCol: 5,
    gridRow: 3,
  },
  { id: 7, name: "Giặc Nội Xâm", type: "QUESTION", gridCol: 5, gridRow: 4 },
  { id: 8, name: "TRẠM DỪNG CHÂN", type: "START", gridCol: 5, gridRow: 5 },
  { id: 9, name: "Hình Phạt Tham Ô", type: "QUESTION", gridCol: 4, gridRow: 5 },
  { id: 10, name: "Bệnh Lãng Phí", type: "QUESTION", gridCol: 3, gridRow: 5 },
  { id: 11, name: "Bệnh Quan Liêu", type: "QUESTION", gridCol: 2, gridRow: 5 },
  {
    id: 12,
    name: "Tư Túng - Chia Rẽ - Kiêu Ngạo",
    type: "QUESTION",
    gridCol: 1,
    gridRow: 5,
  },
  {
    id: 13,
    name: "Nguyên Nhân Tiêu Cực",
    type: "QUESTION",
    gridCol: 1,
    gridRow: 4,
  },
  {
    id: 14,
    name: "Biện Pháp Dân Chủ & Pháp Luật",
    type: "QUESTION",
    gridCol: 1,
    gridRow: 3,
  },
  {
    id: 15,
    name: "Nêu Gương & Yêu Nước",
    type: "QUESTION",
    gridCol: 1,
    gridRow: 2,
  },
];

// Bộ câu hỏi: mỗi ô có 2 câu (vòng 1 / vòng 2), độ khó tăng dần.
// GM có thể tự chỉnh sửa nội dung câu hỏi tại đây.
export const QUESTION_BANK: QuestionBank = {
  1: [
    {
      question:
        "Theo tư tưởng Hồ Chí Minh, vì sao việc kiểm soát quyền lực nhà nước lại là điều tất yếu?",
      options: [
        "Vì Nhà nước có sức mạnh cưỡng chế tuyệt đối trong xã hội.",
        "Vì Nhân dân ủy thác quyền lực cho Nhà nước nên cần kiểm soát theo nguyên tắc 'Của dân - Do dân - Vì dân'.",
        "Vì lực lượng vũ trang cần được định hướng bởi pháp luật.",
        "Vì đó là quy định của luật pháp quốc tế mà Việt Nam tham gia.",
      ],
      correctIndex: 1, // Đáp án B
    },
    {
      question:
        "Nguy cơ lớn nhất phát sinh khi cán bộ và cơ quan nhà nước nắm giữ quyền lực được ủy thác là gì?",
      options: [
        "Bộ máy cồng kềnh, hoạt động kém hiệu quả.",
        "Xói mòn lòng tin của bạn bè quốc tế.",
        "Lạm quyền, quan liêu, thoái hóa, cậy quyền và ngông nghênh đối với nhân dân.",
        "Bị các thế lực thù địch lợi dụng, chia rẽ nội bộ.",
      ],
      correctIndex: 2, // Đáp án C
    },
  ],
  2: [
    {
      question:
        "Hồ Chí Minh xác định có bao nhiêu chủ thể chính tham gia kiểm soát quyền lực nhà nước?",
      options: [
        "3 chủ thể: Đảng, Nhà nước và Nhân dân.",
        "2 chủ thể: Quốc hội và Chính phủ.",
        "4 chủ thể: Đảng, Nhà nước, Mặt trận Tổ quốc và Nhân dân.",
        "1 chủ thể duy nhất: Nhân dân.",
      ],
      correctIndex: 0, // Đáp án A
    },
    {
      question:
        "Vai trò kiểm soát quyền lực của Đảng được thể hiện qua những yêu cầu cốt lõi nào?",
      options: [
        "Chỉ kiểm tra cán bộ khi có đơn thư tố cáo nặc danh.",
        "Kiểm tra có hệ thống, người kiểm tra có uy tín, kiểm soát hai chiều với tinh thần 'phải khéo kiểm soát'.",
        "Tập trung quyền lực vào người đứng đầu để kiểm tra cấp dưới.",
        "Giao toàn quyền kiểm tra cho các cơ quan công an.",
      ],
      correctIndex: 1, // Đáp án B
    },
  ],
  3: [
    {
      question:
        "Chuỗi logic cốt lõi trong sơ đồ kiểm soát quyền lực nhà nước được tóm gọn như thế nào?",
      options: [
        "Ngăn ngừa lạm quyền → Kiểm soát quyền lực → Phân chia giai cấp.",
        "Kiểm soát quyền lực → Ngăn ngừa lạm quyền → Xây dựng Nhà nước trong sạch, vững mạnh.",
        "Xây dựng Nhà nước → Phân chia quyền lực → Ngăn ngừa lạm quyền.",
        "Bầu cử → Ủy thác quyền lực → Tự phê bình và phê bình.",
      ],
      correctIndex: 1, // Đáp án B
    },
    {
      question:
        "Cơ chế kiểm soát quyền lực trong nội bộ bộ máy Nhà nước được tổ chức ra sao?",
      options: [
        "Cấp dưới có quyền phủ quyết hoàn toàn quyết định của cấp trên.",
        "Các cơ quan tư pháp kiểm soát mọi hoạt động của cơ quan hành pháp.",
        "Các cơ quan nhà nước thực hiện phân công và kiểm soát lẫn nhau thông qua cách tổ chức bộ máy.",
        "Lập ra một cơ quan duy nhất đứng trên mọi cơ quan khác để kiểm soát.",
      ],
      correctIndex: 2, // Đáp án C
    },
  ],
  4: [
    {
      question:
        "Tư tưởng kiểm soát quyền lực được thể hiện qua điểm tiến bộ nào trong Hiến pháp năm 1946 do Bác chủ trì?",
      options: [
        "Quốc hội có quyền kiểm soát, phê bình Chính phủ; Bộ trưởng không được tín nhiệm phải từ chức.",
        "Chính phủ có đặc quyền giải tán Quốc hội khi cần thiết.",
        "Chủ tịch nước nắm giữ toàn bộ quyền lực lập pháp và tư pháp.",
        "Nhân dân trực tiếp bỏ phiếu phế truất Bộ trưởng mà không cần thông qua Quốc hội.",
      ],
      correctIndex: 0, // Đáp án A
    },
    {
      question:
        "Trong thực tiễn, việc kiểm soát quyền lực nhà nước được liên hệ ứng dụng qua những tầng bậc nào?",
      options: [
        "Tầng Trung ương, Tầng Địa phương, Tầng Cơ sở.",
        "Tầng Nhà nước (cơ quan giám sát nhau), Tầng Xã hội (báo chí, người dân) và Tầng Sinh viên (làm việc nhóm).",
        "Tầng Lập pháp, Tầng Hành pháp, Tầng Tư pháp.",
        "Tầng Đảng, Tầng Quân đội, Tầng Công an.",
      ],
      correctIndex: 1, // Đáp án B
    },
  ],
  5: [
    {
      question:
        "Mục tiêu cuối cùng của việc kiểm soát quyền lực nhà nước là gì?",
      options: [
        "Đảm bảo mọi người dân đều được tham gia vào cơ quan nhà nước.",
        "Duy trì sự tồn tại và độc tôn của giai cấp lãnh đạo.",
        "Tăng cường quyền lực tuyệt đối của người đứng đầu cơ quan.",
        "Bảo đảm quyền lực luôn thuộc về nhân dân, ngăn ngừa lạm quyền và xây dựng Nhà nước trong sạch, vững mạnh.",
      ],
      correctIndex: 3, // Đáp án D
    },
    {
      question:
        "Vì sao Hồ Chí Minh đặc biệt nhấn mạnh vai trò kiểm soát của Nhân dân?",
      options: [
        "Vì nhân dân đóng thuế nuôi bộ máy nhà nước.",
        "Vì nhân dân trực tiếp nắm giữ lực lượng vũ trang.",
        "Vì luật pháp quốc tế quy định bắt buộc như vậy.",
        "Vì số lượng nhân dân đông hơn rất nhiều, nếu không có quần chúng giúp sức thì Đảng không thể làm được việc gì.",
      ],
      correctIndex: 3, // Đáp án D
    },
  ],
  6: [
    {
      question:
        "Ba nhóm tiêu cực chính cần đề phòng và khắc phục trong bộ máy Nhà nước gồm những gì?",
      options: [
        "Suy thoái kinh tế; Mất đoàn kết; Tụt hậu công nghệ.",
        "Mù chữ; Đói nghèo; Dịch bệnh.",
        "Đặc quyền đặc lợi; Tham ô, lãng phí, quan liêu; 'Tư túng', 'chia rẽ', 'kiêu ngạo'.",
        "Cửa quyền; Nhũng nhiễu; Không hoàn thành chỉ tiêu kinh tế.",
      ],
      correctIndex: 2, // Đáp án C
    },
    {
      question:
        "Biểu hiện cụ thể của nhóm tiêu cực 'Đặc quyền, đặc lợi' là gì?",
      options: [
        "Mua sắm trang thiết bị văn phòng không cần thiết.",
        "Xa rời thực tế, chỉ ngồi viết chỉ thị, đọc báo cáo.",
        "Chia rẽ nội bộ, nói xấu đồng chí mình.",
        "Thái độ cậy quyền, cửa quyền, hạch dịch với dân, lạm dụng chức vụ để trục lợi cá nhân.",
      ],
      correctIndex: 3, // Đáp án D
    },
  ],
  7: [
    {
      question: "Hồ Chí Minh gọi tệ tham ô, lãng phí, quan liêu là gì?",
      options: [
        "'Giặc nội xâm', 'giặc trong lòng', nguy hiểm hơn cả giặc ngoại xâm.",
        "'Bệnh nghề nghiệp' khó tránh khỏi của cán bộ quản lý.",
        "'Khuyết điểm tạm thời' trong quá trình xây dựng đất nước.",
        "'Sản phẩm tất yếu' của sự phát triển kinh tế thị trường.",
      ],
      correctIndex: 0, // Đáp án A
    },
    {
      question:
        "Bốn câu thơ trong bài 'Nửa đêm' (Nhật ký trong tù) thể hiện tư tưởng cốt lõi gì của Hồ Chí Minh về cán bộ?",
      options: [
        "Môi trường, giáo dục và cơ chế kiểm soát quyền lực quyết định người cán bộ.",
        "Con người sinh ra đã được định sẵn bản tính hiền hoặc dữ.",
        "Trí tuệ của cán bộ là yếu tố quyết định đạo đức của họ.",
        "Năng lực chuyên môn là yếu tố quan trọng nhất để làm cán bộ.",
      ],
      correctIndex: 0, // Đáp án A
    },
  ],
  9: [
    {
      question:
        "Tháng 1/1946, Hồ Chí Minh ký sắc lệnh quy định tội tham ô có thể bị xử phạt đến mức án nào?",
      options: [
        "Phạt hành chính và bãi nhiệm.",
        "Phạt tù từ 5 đến 20 năm.",
        "Tịch thu toàn bộ tài sản.",
        "Tử hình.",
      ],
      correctIndex: 3, // Đáp án D
    },
    {
      question:
        "Biện pháp duy trì kỷ cương bộ máy Nhà nước yêu cầu điều gì trong việc thực thi pháp luật?",
      options: [
        "Xử lý nhẹ nhàng, linh hoạt để cán bộ có cơ hội sửa sai nhiều lần.",
        "Thực hiện pháp luật và kỷ luật nghiêm minh, xử lý đúng người đúng tội, không có vùng cấm.",
        "Chỉ xử lý nghiêm đối với cán bộ cấp thấp, khoan hồng với cán bộ cấp cao.",
        "Chỉ dùng biện pháp giáo dục đạo đức, không dùng biện pháp hình sự.",
      ],
      correctIndex: 1, // Đáp án B
    },
  ],
  10: [
    {
      question:
        "Tư tưởng Hồ Chí Minh yêu cầu kết hợp giữa xử phạt và giáo dục cán bộ như thế nào?",
      options: [
        "Đề cao xử phạt răn đe, coi nhẹ việc giáo dục.",
        "Đề cao giáo dục, loại bỏ hoàn toàn các hình thức xử phạt.",
        "Cần kết hợp xử phạt với giáo dục, cảm hóa, không phải việc gì cũng chỉ biết xử phạt.",
        "Xử phạt trước, giáo dục sau và chỉ áp dụng cho quần chúng nhân dân.",
      ],
      correctIndex: 2, // Đáp án C
    },
    {
      question:
        "Để vận dụng tư tưởng Hồ Chí Minh vào công tác xây dựng Đảng và Nhà nước trong sạch, vững mạnh hiện nay, cần tập trung nhiệm vụ gì?",
      options: [
        "Đẩy mạnh cổ phần hóa, giảm bớt sự quản lý của Nhà nước vào nền kinh tế.",
        "Xây dựng Nhà nước đổi mới, kiến tạo; Đảng đề ra đường lối đúng đắn, chú trọng chỉnh đốn Đảng.",
        "Chuyển đổi sang mô hình quản lý đa nguyên để tăng cường sự giám sát lẫn nhau.",
        "Giao quyền kiểm tra, giám sát tối cao cho các tổ chức minh bạch quốc tế.",
      ],
      correctIndex: 1, // Đáp án B
    },
  ],
  11: [
    {
      question: "Phân biệt bản chất của Quan liêu so với Tham ô?",
      options: [
        "Quan liêu là lấy của công dùng vào việc tư.",
        "Quan liêu là xa rời thực tế, chỉ biết khai hội, viết chỉ thị, đọc báo cáo trên giấy mà không kiểm tra.",
        "Quan liêu là tiêu tốn nhiều thời gian, sức lao động vào việc vô bổ.",
        "Quan liêu là việc kéo bè kéo cánh, ưu ái người thân trong cơ quan.",
      ],
      correctIndex: 1, // Đáp án B
    },
    {
      question:
        "Tệ nạn nào được Hồ Chí Minh coi là 'bệnh gốc' sinh ra và dung túng cho tham ô, lãng phí?",
      options: [
        "Bệnh kiêu ngạo.",
        "Bệnh lười biếng.",
        "Bệnh quan liêu.",
        "Bệnh tư túng.",
      ],
      correctIndex: 2, // Đáp án C
    },
  ],
  12: [
    {
      question:
        "Biểu hiện tiêu cực 'Tư túng, chia rẽ, kiêu ngạo' gây ra những tác hại cụ thể nào?",
      options: [
        "Gây thất thoát lớn tài sản ngân sách quốc gia.",
        "Làm chậm tiến trình công nghiệp hóa, hiện đại hóa.",
        "Dẫn đến hành vi kéo bè kéo cánh, ưu ái người thân và gây mất đoàn kết nội bộ.",
        "Làm lộ bí mật quốc gia ra bên ngoài.",
      ],
      correctIndex: 2, // Đáp án C
    },
    {
      question:
        "Trích dẫn nổi tiếng nào của Chủ tịch Hồ Chí Minh thường được dùng để nhấn mạnh mục tiêu bảo vệ quyền lực của nhân dân?",
      options: [
        "'Không có gì quý hơn độc lập, tự do'.",
        "'Cán bộ là cái gốc của mọi công việc'.",
        "'Vì lợi ích mười năm thì phải trồng cây'.",
        "'Đoàn kết, đoàn kết, đại đoàn kết'.",
      ],
      correctIndex: 0, // Đáp án A
    },
  ],
  13: [
    {
      question:
        "Nhóm nguyên nhân chủ quan gây ra các tiêu cực trong đội ngũ cán bộ là gì?",
      options: [
        "Do xuất phát từ chủ nghĩa cá nhân, cán bộ thiếu tu dưỡng, rèn luyện đạo đức.",
        "Do tàn dư của chế độ phong kiến lạc hậu để lại.",
        "Do trình độ phát triển kinh tế - xã hội của nước ta còn thấp.",
        "Do sự chống phá của các thế lực thù địch.",
      ],
      correctIndex: 0, // Đáp án A
    },
    {
      question:
        "Nguyên nhân nào dưới đây KHÔNG PHẢI là nguyên nhân khách quan dẫn đến tiêu cực trong bộ máy Nhà nước?",
      options: [
        "Công tác cán bộ chưa tốt, tổ chức vận hành chưa khoa học.",
        "Cán bộ lười biếng học tập, sa vào chủ nghĩa cá nhân.",
        "Tàn dư chế độ phong kiến và sự chống phá của kẻ thù.",
        "Trình độ phát triển đời sống xã hội còn thấp.",
      ],
      correctIndex: 1, // Đáp án B
    },
  ],
  14: [
    {
      question:
        "Biện pháp nào được Hồ Chí Minh đánh giá là giải pháp căn bản và có ý nghĩa lâu dài nhất để phòng chống tiêu cực?",
      options: [
        "Thực hành dân chủ rộng rãi, nâng cao trình độ dân chủ và phát huy quyền làm chủ của nhân dân.",
        "Tăng cường hình phạt thật nặng đối với mọi vi phạm dù là nhỏ nhất.",
        "Thay thế liên tục cán bộ cũ bằng đội ngũ cán bộ trẻ.",
        "Tập trung quyền giám sát tối cao vào lực lượng công an.",
      ],
      correctIndex: 0, // Đáp án A
    },
    {
      question:
        "Theo tư tưởng Hồ Chí Minh, nguyên nhân chủ quan và nguyên nhân khách quan dẫn đến tiêu cực có mối quan hệ như thế nào?",
      options: [
        "Nguyên nhân khách quan hoàn toàn chi phối nguyên nhân chủ quan.",
        "Nguyên nhân chủ quan có thể tự triệt tiêu nguyên nhân khách quan.",
        "Chúng tồn tại độc lập và không ảnh hưởng gì đến nhau.",
        "Chúng không tách rời mà đan xen, kết hợp với nhau cùng tấn công vào đội ngũ cán bộ.",
      ],
      correctIndex: 3, // Đáp án D
    },
  ],
  15: [
    {
      question:
        "Trục chung xuyên suốt tất cả 5 biện pháp phòng chống tiêu cực trong Nhà nước được tóm gọn là gì?",
      options: [
        "Dân chủ đi đôi với kỷ cương, giáo dục đi đôi với nêu gương.",
        "Trấn áp đi đôi với cải tạo, xử phạt đi đôi với khen thưởng.",
        "Học tập đi đôi với thực hành, phê bình đi đôi với tự phê bình.",
        "Xây dựng đi đôi với bảo vệ, phát triển đi đôi với hội nhập.",
      ],
      correctIndex: 0, // Đáp án A
    },
    {
      question:
        "Trong việc phòng chống tiêu cực, yêu cầu về sự 'nêu gương' được quy định như thế nào?",
      options: [
        "Chỉ áp dụng cho đảng viên, không bắt buộc với quần chúng.",
        "Chức vụ càng thấp thì trách nhiệm nêu gương càng phải cao để phấn đấu.",
        "Chỉ cần nêu gương trong tư tưởng, không cần thể hiện ra hành động thực tế.",
        "Cán bộ phải nêu gương, chức vụ càng cao trách nhiệm nêu gương càng lớn.",
      ],
      correctIndex: 3, // Đáp án D
    },
  ],
};
