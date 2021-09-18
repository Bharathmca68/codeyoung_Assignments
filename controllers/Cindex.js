const translate = require("translate-google");

const Translations = require("../models/Mindex");

const sequelize = require("../config/DBconnections");

exports.getTranslationResponse = (req, res) => {
  const { from, to, text } = req.body;

  console.log(from, "--", to, "--", text);

  sequelize
    .query(
      "CALL getTranslatedResponse(:fromLanguage ,:toLanguage, :textContent) ",
      {
        replacements: { fromLanguage: from, toLanguage: to, textContent: text },
      }
    )
    .then((data) => {
      console.log(data);
      if (data && data.length > 0) {
        res.status(200).json({
          message: "text successfully translated : ",
          translatedText: data[0].translatedText,
        });
      } else {
        translate(text, { from: from, to: to }).then((data) => {
          console.log(data);
          DBconnections.query(
            "CALL addTranslatedResponse(:fromLanguage, :toLanguage, :textContent )",
            {
              replacements: {
                fromLanguage: from,
                toLanguage: to,
                textContent: text,
                translatedText: data,
              },
            }
          )
            .then((data) => {
              res.ststatus(200).json({
                message: "text successfully translated : ",
                translatedText: data,
              });
            })
            .catch((err) => {
              console.log(err, "some error ");
            });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
