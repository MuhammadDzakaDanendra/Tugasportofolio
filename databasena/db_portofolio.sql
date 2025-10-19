-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 19, 2025 at 11:53 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_portofolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_about`
--

CREATE TABLE `tb_about` (
  `id` bigint UNSIGNED NOT NULL,
  `text1` varchar(255) NOT NULL,
  `text2` varchar(255) NOT NULL,
  `lokasi` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `kotak1_1` varchar(255) NOT NULL,
  `kotak1_2` varchar(255) NOT NULL,
  `kotak2_1` varchar(255) NOT NULL,
  `kotak2_2` varchar(255) NOT NULL,
  `kotak3_1` varchar(255) NOT NULL,
  `kotak3_2` varchar(255) NOT NULL,
  `kotak4_1` varchar(255) NOT NULL,
  `kotak4_2` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_about`
--

INSERT INTO `tb_about` (`id`, `text1`, `text2`, `lokasi`, `email`, `kotak1_1`, `kotak1_2`, `kotak2_1`, `kotak2_2`, `kotak3_1`, `kotak3_2`, `kotak4_1`, `kotak4_2`) VALUES
(1, 'abhy', 'cina', '', '', '', '', '', '', '', '', '', ''),
(2, '', '', 'kkk', '', '', '', '', '', '', '', '', ''),
(3, '', '', 'kkk', '', '', '', '', '', '', '', '', ''),
(4, 'abhy', 'cina', '', '', '', '', '', '', '', '', '', ''),
(5, 'abhy', 'cina', 'indonesia', 'zaki@gmaiil.com', '', '', '', '', '', '', '', ''),
(6, '', '', '', '', 'danis', '', 'diqie', '', 'pikachu', '', 'mickey', ''),
(7, '', '', '', 'abhy@gmail.com', '', '', '', '', '', '', '', ''),
(8, 'saya adalah seorang frontend', '', '', '', '', '', '', '', '', '', '', ''),
(9, 'abhy', '', '', '', '', '', '', '', '', '', '', ''),
(10, 'saya adalah seorang frontend', '', '', '', '', '', '', '', '', '', '', ''),
(11, 'saya adalah seorang frontend', 'saya backend', '', '', '', '', '', '', '', '', '', ''),
(12, 'saya adalah seorang frontend', 'saya backend', 'kkk', '', '', '', '', '', '', '', '', ''),
(13, 'saya adalah seorang frontend', 'saya backend', 'kkkooo', '', '', '', '', '', '', '', '', ''),
(14, 'saya adalah seorang frontend', 'saya backend', 'kkkooo', '', '', '', '', '', '', '', '', ''),
(15, 'saya adalah seorang frontend', 'cina', 'kkkooo', '', '', '', '', '', '', '', '', ''),
(16, 'saya adalah seorang frontend', 'cina', 'kkkooo', 'admin@gmail.com', '', '', '', '', '', '', '', ''),
(17, 'abhy', '', '', '', '', '', '', '', '', '', '', ''),
(18, 'abhy', 'backend', 'Indonesia', 'muhammaddzakihasyim@gmail.com', 'Frontend', 'UI/UX yang responsif dan interaktif', 'Backend', 'API yang robust dan scalable', 'Database', 'Desain dan optimasi database', 'Deployment', 'Cloud hosting dan DevOps'),
(19, 'abhy', 'backend', 'Indonesia', 'muhammaddzakihasyim@gmail.com', 'fulllstack', 'UI/UX yang responsif dan interaktif', 'Backend', 'API yang robust dan scalable', 'Database', 'Desain dan optimasi database', 'Deployment', 'Cloud hosting dan DevOps'),
(20, 'zaki', 'backend', 'Indonesia', 'muhammaddzakihasyim@gmail.com', 'fulllstack', 'UI/UX yang responsif dan interaktif', 'Backend', 'API yang robust dan scalable', 'Database', 'Desain dan optimasi database', 'Deployment', 'Cloud hosting dan DevOps'),
(21, '', '', '', '', '', '', '', '', '', '', '', ''),
(22, 'Saya adalah seorang fullstack developer dengan pengalaman lebih dari 5 tahun dalam membangun aplikasi web yang efisien dan user-friendly.', 'Dengan keahlian di frontend dan backend development, saya mampu menangani proyek dari konsep hingga deployment. Saya selalu mengikuti perkembangan teknologi terbaru dan menerapkan best practices dalam setiap proyek.', 'Indonesia', 'muhammaddzakihasyim@gmail.com', 'Frontende', 'UI/UX yang responsif dan interaktif', 'Backend', 'API yang robust dan scalable', 'Database', 'Desain dan optimasi database', 'Deployment', 'Cloud hosting dan DevOps'),
(23, 'Saya adalah seorang fullstack developer dengan pengalaman lebih dari 3 tahun dalam membangun aplikasi web yang efisien dan user-friendly.', 'Dengan keahlian di frontend dan backend development, saya mampu menangani proyek dari konsep hingga deployment. Saya selalu mengikuti perkembangan teknologi terbaru dan menerapkan best practices dalam setiap proyek.', 'Indonesia', 'muhammaddzakihasyim@gmail.com', 'Frontende', 'UI/UX yang responsif dan interaktif', 'Backend', 'API yang robust dan scalable', 'Database', 'Desain dan optimasi database', 'Deployment', 'Cloud hosting dan DevOps'),
(24, 'Saya adalah seorang fullstack developer dengan pengalaman lebih dari 3 tahun dalam membangun aplikasi web yang efisien dan user-friendly.', 'Dengan keahlian di frontend dan backend development, saya mampu menangani proyek dari konsep hingga deployment. Saya selalu mengikuti perkembangan teknologi terbaru dan menerapkan best practices dalam setiap proyek.', 'Indonesia', 'muhammaddzakihasyim@gmail.com', 'Frontend', 'Next Js', 'Backend', 'Next Js dan Laravel', 'Database', 'Php My admin', 'Deployment', 'Web Developer'),
(25, 'Saya adalah seorang fullstack developer dengan pengalaman lebih dari 3 tahun dalam membangun aplikasi web yang efisien dan user-friendly.', 'Dengan keahlian di frontend dan backend development, saya mampu menangani proyek dari konsep hingga deployment. Saya selalu mengikuti perkembangan teknologi terbaru dan menerapkan best practices dalam setiap proyek.', 'Indonesia', 'muhammaddzakihasyim@gmail.com', 'Frontend', 'Next Js dan tailwind css', 'Backend', 'Next Js dan Laravel', 'Database', 'Php My admin', 'Deployment', 'Web Developer'),
(26, 'Saya adalah seorang fullstack developer dengan pengalaman lebih dari 3 tahun dalam membangun aplikasi web yang efisien dan user-friendly.', 'Dengan keahlian di frontend dan backend development, saya mampu menangani proyek dari konsep hingga deployment. Saya selalu mengikuti perkembangan teknologi terbaru dan menerapkan best practices dalam setiap proyek.', 'Indonesia', 'muhammaddzakihasyim@gmail.com', 'Frontend', 'React. JS dan tailwind css', 'Backend', 'Next Js dan Laravel', 'Database', 'Php My admin', 'Deployment', 'Web Developer'),
(27, 'Saya adalah seorang fullstack developer dengan pengalaman lebih dari 3 tahun dalam membangun aplikasi web yang efisien dan user-friendly.', 'Dengan keahlian di frontend dan backend development, saya mampu menangani proyek dari konsep hingga deployment. Saya selalu mengikuti perkembangan teknologi terbaru dan menerapkan best practices dalam setiap proyek.', 'Indonesia', 'muhammaddzakihasyim@gmail.com', 'Frontend', 'React. JS dan tailwind css', 'Backend', 'Next Js dan Laravel', 'Database', 'My SQl', 'Github', 'zaki213'),
(28, 'Saya adalah seorang fullstack developer dengan pengalaman lebih dari 3 tahun dalam membangun aplikasi web yang efisien dan user-friendly.', 'Dengan keahlian di frontend dan backend development, saya mampu menangani proyek dari konsep hingga deployment. Saya selalu mengikuti perkembangan teknologi terbaru dan menerapkan best practices dalam setiap proyek.', 'Indonesia', 'muhammaddzakihasyim@gmail.com', 'Frontend', 'React. JS dan tailwind css', 'Backend', 'Next Js dan Laravel', 'Database', 'My SQl', 'Github', 'zaki2134'),
(29, 'Saya adalah seorang yang suka menggambar', 'Dengan keahlian menggambar sy, sya dapat mendesain karakter sesuai request', 'Indonesia', 'danendrmd@gmail.com', 'Frontend', 'React. JS dan tailwind css', 'Backend', 'Next Js dan Laravel', 'Database', 'My SQl', 'Github', 'dendra2411'),
(30, 'Saya adalah seorang yang suka menggambar', 'Dengan keahlian menggambar saya, saya dapat mendesain karakter sesuai request', 'Indonesia', 'danendrmd@gmail.com', 'Menggambar', 'Saya dapat menggambar di pensil dan digital', 'Main Game', 'Saya suka bermain game', 'Editing', 'Saya terkadang edit gambar', 'PPT', 'Saya bisa membuat PPT'),
(31, 'Saya adalah seorang yang suka menggambarr', 'Dengan keahlian menggambar saya, saya dapat mendesain karakter sesuai request', 'Indonesia', 'danendrmd@gmail.com', 'Menggambar', 'Saya dapat menggambar di pensil dan digital', 'Main Game', 'Saya suka bermain game', 'Editing', 'Saya terkadang edit gambar', 'PPT', 'Saya bisa membuat PPT'),
(32, 'Saya adalah seorang yang suka menggambarr', 'Dengan keahlian menggambar saya, saya dapat mendesain karakter sesuai request', 'Indonesia', 'danendrmd@gmail.com', 'Menggambar', 'Saya dapat menggambar di pensil dan digital', 'Ngoding', 'Saya suka bermain game', 'Editing', 'Saya terkadang edit gambar', 'PPT', 'Saya bisa membuat PPT');

-- --------------------------------------------------------

--
-- Table structure for table `tb_contact`
--

CREATE TABLE `tb_contact` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `nomor` varchar(255) NOT NULL,
  `lokasi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_contact`
--

INSERT INTO `tb_contact` (`id`, `email`, `nomor`, `lokasi`) VALUES
(1, 'zaki@gmaiil.com', 'zaki', 'Makassar'),
(2, 'zaki@gmaiil.com', 'Muhammad Dzaki Hasyim', 'Makassar'),
(3, 'zaki@gmaiil.com', '0821-1111-2222-3333', 'Makassar'),
(4, 'danendramd@gmail.com', '0813-5183-1191', 'Makassar'),
(5, 'danendramd@gmail.com', '0813-5183-1191', 'Makassar'),
(6, 'danendramd@gmail.com', '0813-5183-1191', 'Makassar'),
(7, 'mail.com', '0813-5183-1191', 'Makassar');

-- --------------------------------------------------------

--
-- Table structure for table `tb_home`
--

CREATE TABLE `tb_home` (
  `id` bigint UNSIGNED NOT NULL,
  `foto` text NOT NULL,
  `judul` varchar(255) NOT NULL,
  `sub_judul` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_home`
--

INSERT INTO `tb_home` (`id`, `foto`, `judul`, `sub_judul`) VALUES
(17, '/foto/1757985923097-portofolio.png', 'Fullstack Developer', 'Membangun solusi web modern dengan teknologi terdepan dan pengalaman pengguna yang luar biasa'),
(18, '/foto/1757986094221-portofolio.png', 'hhohohoho', 'shsh'),
(19, '/foto/1758069762339-portofolio.png', 'Fullstack Developer', 'Membangun solusi web modern dengan teknologi terdepan dan pengalaman pengguna yang luar biasa'),
(20, '/foto/1758077548813-tes.JPG', 'hyg', 'b'),
(21, '/foto/1758078703834-portofolio.png', 'Fullstack Developer', 'Membangun solusi web modern dengan teknologi terdepan dan pengalaman pengguna yang luar biasa'),
(22, '/foto/1758085172920-portofolio.png', 'Fullstack Developer', 'abhy'),
(23, '/foto/1758085201500-portofolio.png', 'Fullstack Developer', 'Membangun solusi web modern dengan teknologi terdepan dan pengalaman pengguna yang luar biasa'),
(24, '/foto/1758502736143-portofolio.png', 'niger', 'niger'),
(25, '/foto/1758502769385-MUHAMMAD DZAKI HASYIM.JPG', 'Fullstack Developer', 'Membangun solusi web modern dengan teknologi terdepan dan pengalaman pengguna yang luar biasa'),
(26, '/foto/1759713309566-MUHAMMAD DZAKI HASYIM.JPG', 'Backend Developer', ''),
(27, '/foto/1759713323368-portofolio.png', '', ''),
(28, '/foto/1760500149494-XII-RPL-2_0076199063_SPPTKA_Muhammad Dzaka Danendra.jpg', 'Judulll', ''),
(29, '/foto/1760500574393-XII-RPL-2_0076199063_SPPTKA_Muhammad Dzaka Danendra.jpg', 'Portofolio', 'Saya dendra'),
(30, '/foto/1760501845930-XII-RPL-2_0076199063_SPPTKA_Muhammad Dzaka Danendra.jpg', 'Portofolio', 'Saya Dendra'),
(31, '/foto/1760506010017-XII-RPL-2_0076199063_SPPTKA_Muhammad Dzaka Danendra.jpg', 'Portofolio', 'Saya Dendra'),
(32, '/foto/1760506023667-XII-RPL-2_0076199063_SPPTKA_Muhammad Dzaka Danendra.jpg', 'Portofolio', 'Portofolio!!!'),
(33, '/foto/1760516916697-XII-RPL-2_0076199063_SPPTKA_Muhammad Dzaka Danendra.jpg', 'Dendra', 'Say adalah siswa telkom'),
(34, '/foto/1760516978888-WIN_20240215_20_46_55_Pro (2).jpg', '', 'Say adalah siswa telkom makassar');

-- --------------------------------------------------------

--
-- Table structure for table `tb_proyek1`
--

CREATE TABLE `tb_proyek1` (
  `id` bigint UNSIGNED NOT NULL,
  `gambar` text NOT NULL,
  `judul` varchar(255) NOT NULL,
  `sub_judul` varchar(255) NOT NULL,
  `bahasa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_proyek1`
--

INSERT INTO `tb_proyek1` (`id`, `gambar`, `judul`, `sub_judul`, `bahasa`) VALUES
(1, '[object File]', 'halo', 'baco', 'becce'),
(2, '[object File]', 'b', 'c', 'd'),
(3, '[object File]', 'cd', 'baco', 'bece'),
(4, '[object File]', 'abhy', 'diqie', 'danis'),
(5, '[object File]', 'pp', 'hh', 'becce'),
(6, '[object File]', 'pikachuu', 'mickiey', 'zaki'),
(7, '[object File]', 'mickeyyy', 'pikachuuu', 'zakiiiii'),
(8, '[object File]', 'abcdefg', 'hijklmno', 'pqrstu'),
(9, '/uploads/projects/project1/1759377102624-Screenshot 2025-10-01 131905.png', 'hha', 'baco', 'becce'),
(10, '/uploads/projects/project1/1759638165581-dashboard.png', 'halo', 'bro', 'baco,becce'),
(11, '/uploads/projects/project1/1759638545077-WhatsApp Image 2025-05-31 at 19.21.06_19086443.jpg', 'Website Surat Izin BK', 'Website yang mempermudah siswa melakukan Izin', 'Next Js,Tailwind Css,Laravel'),
(12, '/uploads/projects/project1/1760501289723-veytra.jpg', 'Veytra', 'tugas sekolah saya', 'Project 1'),
(13, '/uploads/projects/project1/1760501428364-veytra.jpg', 'Veytra', 'tugas sekolah saya', 'Project 1');

-- --------------------------------------------------------

--
-- Table structure for table `tb_proyek2`
--

CREATE TABLE `tb_proyek2` (
  `id` bigint UNSIGNED NOT NULL,
  `gambar` text NOT NULL,
  `judul` varchar(255) NOT NULL,
  `sub_judul` varchar(255) NOT NULL,
  `bahasa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_proyek2`
--

INSERT INTO `tb_proyek2` (`id`, `gambar`, `judul`, `sub_judul`, `bahasa`) VALUES
(1, '[object File]', 'd', 'c', 'a'),
(2, '/uploads/projects/project2/1759640303111-WhatsApp Image 2025-05-31 at 19.23.51_f94be696.jpg', 'Pkwu', 'tugas sekolah', 'sql'),
(3, '/uploads/projects/project2/1760501477777-Screenshot (2).png', 'Tugas kelas 1', 'Tugas sekolah', 'Projek 2');

-- --------------------------------------------------------

--
-- Table structure for table `tb_proyek3`
--

CREATE TABLE `tb_proyek3` (
  `id` bigint UNSIGNED NOT NULL,
  `gambar` text NOT NULL,
  `judul` varchar(255) NOT NULL,
  `sub_judul` varchar(255) NOT NULL,
  `bahasa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_proyek3`
--

INSERT INTO `tb_proyek3` (`id`, `gambar`, `judul`, `sub_judul`, `bahasa`) VALUES
(1, '/uploads/projects/project3/1759713200139-WhatsApp Image 2025-05-31 at 19.23.51_f94be696.jpg', 'Website Surat izin', 'berguna untuk membantu siswa mengajukan izin', 'Next Js,Laravel,Tailwind css'),
(2, '/uploads/projects/project3/1760501526220-Mashu-chan.jpg.jpg', 'Gambar saya', 'Gambr', 'Projek 3');

-- --------------------------------------------------------

--
-- Table structure for table `tb_skills1`
--

CREATE TABLE `tb_skills1` (
  `id` bigint UNSIGNED NOT NULL,
  `keterangan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_skills1`
--

INSERT INTO `tb_skills1` (`id`, `keterangan`) VALUES
(16, 'React JS, Tailwind CSS'),
(17, 'React JS, Tailwind CSS'),
(18, 'React JS, Tailwind CSS'),
(19, 'React JS, Tailwind CSS'),
(20, 'React JS, Tailwind CSS'),
(21, 'React JS, Tailwind CSS');

-- --------------------------------------------------------

--
-- Table structure for table `tb_skills2`
--

CREATE TABLE `tb_skills2` (
  `id` bigint UNSIGNED NOT NULL,
  `keterangan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_skills2`
--

INSERT INTO `tb_skills2` (`id`, `keterangan`) VALUES
(1, 'Skill 2 description'),
(2, 'Skill 2 description'),
(3, 'Skill 2 description'),
(4, ''),
(5, 'Node.js,Express.js,Python,Django,PHP,Laravel'),
(6, 'Node.js,Express.js,Python,Django,PHP,Laravel'),
(7, 'Node.js,Express.js,Python,Django,PHP,Laravel'),
(8, 'Node.js,Express.js,Python,Django,PHP,Laravel'),
(9, 'Node.js,Express.js,Python,Django,PHP,Laravel'),
(10, 'Node.js,Express.js,Python,Django,PHP,Laravel'),
(11, 'Node.js,Express.js,Python,Django,PHP,Laravel'),
(12, 'Node.js,Express.js,Python,Django,PHP,Laravel'),
(13, 'Node.js,Express.js,Python,Django,PHP,Laravel'),
(14, 'cina'),
(15, 'Next JS, Laravel'),
(16, 'Next JS, Laravel'),
(17, 'Next JS, Laravel'),
(18, 'Next JS, Laravel'),
(19, 'Next JS, Laravel'),
(20, 'Next JS, Laravel'),
(21, 'Next JS, Laravel!');

-- --------------------------------------------------------

--
-- Table structure for table `tb_skills3`
--

CREATE TABLE `tb_skills3` (
  `id` bigint UNSIGNED NOT NULL,
  `keterangan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_skills3`
--

INSERT INTO `tb_skills3` (`id`, `keterangan`) VALUES
(1, 'Skill 3 description'),
(2, 'Skill 3 description'),
(3, 'Skill 3 description'),
(4, 'Skill 3 description'),
(5, 'p'),
(6, 'p,c,d'),
(7, 'p,c,de'),
(8, 'p,c,def'),
(9, 'p,c,def,g'),
(10, 'p,c,def,g'),
(11, 'p,c,def,g'),
(12, 'p,c,def,g'),
(13, 'p,c,def,g,f'),
(14, 'p,c,def,g,f'),
(15, 'My SQl'),
(16, 'My SQl'),
(17, 'My SQl, Php My Admin'),
(18, 'My SQl, Php My Admin'),
(19, 'My SQl, Php'),
(20, 'My SQl, Php ,MongoDB'),
(21, 'My SQl, Php ,MongoDB');

-- --------------------------------------------------------

--
-- Table structure for table `tb_skills4`
--

CREATE TABLE `tb_skills4` (
  `id` bigint UNSIGNED NOT NULL,
  `keterangan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_skills4`
--

INSERT INTO `tb_skills4` (`id`, `keterangan`) VALUES
(1, 'Skill 4 description'),
(2, 'Skill 4 description'),
(3, 'Skill 4 description'),
(4, 'Skill 4 description'),
(5, 'Skill 4 description'),
(6, 'Skill 4 description'),
(7, 'Skill 4 description'),
(8, 'Skill 4 description'),
(9, 'Skill 4 description'),
(10, 'Skill 4 description,skil1'),
(11, 'Skill 4 description,skil1'),
(12, 'Skill 4 description,skil1'),
(13, 'Skill 4 description,skil1'),
(14, 'Skill 4 description,skil1'),
(15, 'Laptop'),
(16, 'Browser, Vs Code'),
(17, 'Browser, Vs Code'),
(18, 'Browser, Vs Code, Laptop'),
(19, 'Browser, Vs Code, Laptop'),
(20, 'Browser, Vs Code, Laptop'),
(21, 'Browser, Vs Code, Laptop');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(2, 'admin', 'admin@gmail.com', '$2b$10$TW.QSJUqyWmSDW.2KtULvOUAECW88EWw19fZHUJRlQ.zcPoR7WvYG', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_about`
--
ALTER TABLE `tb_about`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_contact`
--
ALTER TABLE `tb_contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_home`
--
ALTER TABLE `tb_home`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_proyek1`
--
ALTER TABLE `tb_proyek1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_proyek2`
--
ALTER TABLE `tb_proyek2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_proyek3`
--
ALTER TABLE `tb_proyek3`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_skills1`
--
ALTER TABLE `tb_skills1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_skills2`
--
ALTER TABLE `tb_skills2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_skills3`
--
ALTER TABLE `tb_skills3`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_skills4`
--
ALTER TABLE `tb_skills4`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_about`
--
ALTER TABLE `tb_about`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `tb_contact`
--
ALTER TABLE `tb_contact`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tb_home`
--
ALTER TABLE `tb_home`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tb_proyek1`
--
ALTER TABLE `tb_proyek1`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_proyek2`
--
ALTER TABLE `tb_proyek2`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_proyek3`
--
ALTER TABLE `tb_proyek3`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_skills1`
--
ALTER TABLE `tb_skills1`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tb_skills2`
--
ALTER TABLE `tb_skills2`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tb_skills3`
--
ALTER TABLE `tb_skills3`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tb_skills4`
--
ALTER TABLE `tb_skills4`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
