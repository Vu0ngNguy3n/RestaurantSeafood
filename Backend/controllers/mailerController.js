const nodemailer = require("nodemailer");

const mailerController = {
  sendMail: async (req, res) => {
    try {
      const content = req.body;
      const cod = 45000;
      const tableCart = `<table cellpadding="2" cellspacing="2">
            <tr >
                <th>STT</th>
                <th>Hình Hải Sản</th>
                <th>Tên Hải Sản</th>
                <th>Đơn Giá</th>
                <th>Số Lượng</th>
                <th>Thành tiền</th>
            </tr>
        ${content.cart.map((e, index) => {
          return `<tr class="tabdata">
                <td>${index}</td>
                <td><img alt='' src=${e.img}/></td>
                <td>${e.name}</td>
                <td>${e.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}</td>
                <td>${e.total}</td>
                <td>${e.totalPrice?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}</td>
            </tr>`;
        })}
            <tr class="tabdata">
                <td colspan="5" >Tổng tiền</td>
                <td>${content.totalCart?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}</td>
            </tr>
            <tr class="tabdata">
                <td colspan="5" >Số tiền giảm</td>
                <td>${(cod - cod)?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}</td>
            </tr>
            <tr class="tabdata">
                <td colspan="5" >Phí Ship</td>
                <td>${cod?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}</td>
            </tr>
            <tr class="tabdata">
                <td colspan="5" >Tổng tiền</td>
                <td>${(content.totalCart + cod)?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}</td>
            </tr>
            

        </table>`;
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "vuongnv282@gmail.com", // generated ethereal user
          pass: "nswzqdnnggnyxatx", // generated ethereal password
        },
      });

      // send mail with defined transport object
      await transporter.sendMail(
        {
          from: "vuongnv282@gmail.com", // sender address
          to: `${content.email}`, // list of receivers
          subject: `Đơn hàng từ Hồng Liên Hải Sản Cửa Lò`, // Subject line
          text: `Đơn hàng của ${content.name}`, // plain text body
          html: `<b>Đơn hàng từ Hồng Liên Hải Sản Cửa Lò</b><br/>
            <label>Họ và tên: ${content.name}</label><br/>
            <label>Địa chỉ: ${content.address}</label><br/>
            <label>Tỉnh: ${content.hometown}</label><br/>
            <label>Email: ${content.email}</label><br/>
            <label>Số Điện Thoại: ${content.phone}</label><br/>
            <label>Hình thức thanh toán: ${content.typePay}</label><br/>
            <hr/>
            ${tableCart}
          `, // html body
        },
        (err) => {
          if (err) {
            return res.json({
              message: `${req.body}`,
              err,
            });
          }
          return res.json({
            message: "success",
          });
        }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = mailerController;
