--MKULIMA APPLICATION TABLES



-- Table structure for table `login`
--

CREATE TABLE `login` (
  `login_id` int(11) NOT NULL PRIMARY KEY AUTO INCREMENT,
  `login_email` varchar(255) NOT NULL UNIQUE,
  `login_username` varchar(255) NOT NULL,
  `login_location` varchar(255) NOT NULL,
  `login_password` varchar(100) NOT NULL,
  `login_role` varchar(255) NOT NULL,
  `login_contact` varchar(255) NOT NULL,
  `login_terms` tinyint(4) NOT NULL DEFAULT 0,
  `login_created_on` datetime(6) DEFAULT current_timestamp(6)
);




-
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL PRIMARY KEY AUTO INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_quantity` varchar(255) NOT NULL,
  `product_price` varchar(255) NOT NULL,
  `product_category` varchar(255) NOT NULL,
  `product_login_id` int(11) NOT NULL,
  `product_decription` varchar(255) NOT NULL,
  `product_location` varchar(255) DEFAULT NULL,
  `product_posted_on` datetime(6) DEFAULT current_timestamp(6),
  `product_promoted` tinyint(4) DEFAULT NULL,
  FOREIGN KEY (`product_login_id`) REFERENCES `login` (`login_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
) ;




--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `image_id` int(11) NOT NULL PRIMARY KEY AUTO INCREMENT,
  `image_url` varchar(255) NOT NULL,
  `image_product_id` int(11) NOT NULL,
   FOREIGN KEY (`image_product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
) ;







--
-- Table structure for table `promoted`
--

CREATE TABLE `promoted` (
  `promoted_id` int(11) NOT NULL AUTO INCREMENT,
  `promoted_product_id` int(11) NOT NULL,
  `promoted_product_status` varchar(255) NOT NULL,
  FOREIGN KEY (`promoted_product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
);



-- Table structure for table `chat_room`
--

CREATE TABLE `chat_room` (
  `room_id` int(11) NOT NULL PRIMARY KEY AUTO INCREMENT,
  `room_created_date` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `room_visibility` varchar(255) NOT NULL,
  `room_chat_sender` int(11) NOT NULL,
  `room_chat_receiver` int(11) NOT NULL,
  `room_chat_sender_name` varchar(255) NOT NULL,
  `room_chat_receiver_name` text DEFAULT NULL,
  FOREIGN KEY (`room_chat_sender`) REFERENCES `login` (`login_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  FOREIGN KEY (`room_chat_receiver`) REFERENCES `login` (`login_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
  
);


-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `complaint_id` int(11) NOT NULL PRIMARY KEY AUTO INCREMENT,
  `complaint_message` text NOT NULL,
  `complaint_date` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `complaint_email` text NOT NULL,
  `complaint_name` text NOT NULL
);


--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL PRIMARY KEY AUTO INCREMENT,
  `message_sender_id` int(11) NOT NULL,
  `message_time` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `message_sender_name` varchar(255) DEFAULT NULL,
  `message_room_id` int(11) NOT NULL,
  `message_content` text NOT NULL,
  `message_media` text DEFAULT NULL,
  FOREIGN KEY (`message_sender_id`) REFERENCES `login` (`login_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  FOREIGN KEY (`message_receiver_id`) REFERENCES `login` (`login_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  FOREIGN KEY (`message_room_id`) REFERENCES `chat_room` (`room_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
) ;


-- --------------------------------------------------------

-
