import React, { useEffect, useState } from "react";
import { BsFillPencilFill, BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import Card from "../components/Card";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Table from "../components/Table";
import "../styles/jour.scss";
import { capitalise, evaluate } from "../utils/functions";
import ConfirmModal from "../components/ConfirmModal";

export default function Jour() {
  const [show, setShow] = useState([false, false, false, false, false]);
  const [epargne, setEpargne] = useState("");
  const [cash, setCash] = useState("");
  const [reintegre, setReintegre] = useState("");
  const week = ["Date", "Dépenses", "Commentaire", "Actions"];
  const { type, date } = useParams();
  const [formatDate, setFormatDate] = useState(
    `${parseInt(date.split("-")[2]).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}/${parseInt(date.split("-")[1]).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}/${date.split("-")[0]}`
  );
  useEffect(() => {
    setFormatDate(
      type === "mois"
        ? `${parseInt(date.split("-")[1]).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}/${date.split("-")[0]}`
        : `${parseInt(date.split("-")[2]).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}/${parseInt(date.split("-")[1]).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}/${date.split("-")[0]}`
    );

    setContent(addActionsToData(content));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, type, formatDate]);

  const [content, setContent] = useState([
    {
      Date: "05/08/2022",
      Dépense: 10,
      Comment: "Jus",
    },
    {
      Date: "05/08/2022",
      Dépense: 10,
      Comment: "Jus",
    },
    {
      Date: "08/08/2022",
      Dépense: 15,
      Comment: "Jus",
    },
  ]);
  const addActionsToData = (data) => {
    let X = [];
    for (let el of data) {
      let x = el;
      x["Actions"] = (
        <div className="actions-container">
          <span
            onClick={() =>
              generalModalOpen(1, {
                date: el.Date,
                montant: el.Dépense,
                commentaire: el.Comment,
              })
            }
          >
            <BsFillPencilFill />
          </span>
          <span onClick={() => generalModalOpen(5)}>
            <FaTrash />
          </span>
        </div>
      );
      X.push(x);
    }
    return X;
  };
  const generalModalClose = (i) => {
    const formik = [
      addFormik,
      editFormik,
      epargneFormik,
      cashFormik,
      reintegreFormik,
    ];
    let x = show;
    x[i] = false;
    setShow([...x]);
    formik[i].resetForm();
  };
  const generalModalOpen = (i, obj) => {
    const formik = [
      addFormik,
      editFormik,
      epargneFormik,
      cashFormik,
      reintegreFormik,
    ];
    let x = [false, false, false, false, false, false];
    x[i] = true;
    if (obj) {
      for (let el of Object.keys(obj)) {
        formik[i].setFieldValue(el, obj[el]);
      }
    }
    setShow([...x]);
  };
  const depenseSchema = yup.object({
    montant: yup.string().required("Ce champ est obligatoire"),
    commentaire: yup.string().max(20, "Commentaire trop long"),
    date: yup.string().required("Ce champ est obligatoire"),
  });
  const addFormik = useFormik({
    initialValues: {
      montant: "",
      commentaire: "",
      date: type === "jour" ? formatDate : "",
    },
    validateOnChange: false,
    validationSchema: depenseSchema,
    validate: (values) => {
      const errors = {};
      try {
        addFormik.setFieldValue("montant", evaluate(values.montant).toString());
      } catch (error) {
        try {
          addFormik.setFieldValue(
            "montant",
            evaluate(
              values.montant.substring(1, values.montant.length)
            ).toString()
          );
        } catch (error) {
          errors.montant = "Veillez saisir un nombre ou une equation valide";
        }
        return errors;
      }
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      generalModalClose(0);
    },
  });
  const editFormik = useFormik({
    initialValues: {
      montant: "",
      commentaire: "",
      date: "",
    },
    validateOnChange: false,
    validationSchema: depenseSchema,
    validate: (values) => {
      const errors = {};
      try {
        editFormik.setFieldValue(
          "montant",
          evaluate(values.montant).toString()
        );
      } catch (error) {
        try {
          editFormik.setFieldValue(
            "montant",
            evaluate(
              values.montant.substring(1, values.montant.length)
            ).toString()
          );
        } catch (error) {
          errors.montant = "Veillez saisir un nombre ou une equation valide";
        }
        return errors;
      }
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      generalModalClose(1);
    },
  });
  const epargneFormik = useFormik({
    initialValues: {
      montant: "",
      type: "",
      date: "",
    },
    validateOnChange: false,
    validate: (values) => {
      const errors = {};
      try {
        epargneFormik.setFieldValue(
          "montant",
          evaluate(values.montant).toString()
        );
      } catch (error) {
        try {
          epargneFormik.setFieldValue(
            "montant",
            evaluate(
              values.montant.substring(1, values.montant.length)
            ).toString()
          );
        } catch (error) {
          errors.montant = "Veillez saisir un nombre ou une equation valide";
        }
        return errors;
      }
    },
    onSubmit: (values) => {
      setEpargne(values.montant);
      generalModalClose(2);
    },
  });
  const cashFormik = useFormik({
    initialValues: {
      montant: "",
      type: "",
      date: "",
    },
    validateOnChange: false,
    validate: (values) => {
      const errors = {};
      try {
        cashFormik.setFieldValue(
          "montant",
          evaluate(values.montant).toString()
        );
      } catch (error) {
        try {
          cashFormik.setFieldValue(
            "montant",
            evaluate(
              values.montant.substring(1, values.montant.length)
            ).toString()
          );
        } catch (error) {
          errors.montant = "Veillez saisir un nombre ou une equation valide";
        }
        return errors;
      }
    },
    onSubmit: (values) => {
      setCash(values.montant);
      generalModalClose(3);
    },
  });
  const reintegreFormik = useFormik({
    initialValues: {
      montant: "",
      type: "",
      date: "",
    },
    validateOnChange: false,
    validate: (values) => {
      const errors = {};
      try {
        reintegreFormik.setFieldValue(
          "montant",
          evaluate(values.montant).toString()
        );
      } catch (error) {
        try {
          reintegreFormik.setFieldValue(
            "montant",
            evaluate(
              values.montant.substring(1, values.montant.length)
            ).toString()
          );
        } catch (error) {
          errors.montant = "Veillez saisir un nombre ou une equation valide";
        }
        return errors;
      }
    },
    onSubmit: (values) => {
      setReintegre(values.montant);
      generalModalClose(4);
    },
  });
  return (
    <div className="jour-container">
      <div className="mini-card-container">
        <Card>
          <div className="mini-card-content">
            <p className="mini-card-title">{capitalise(type)}</p>
            <p>{formatDate}</p>
          </div>
        </Card>

        <Card>
          <div className="mini-card-content">
            <p className="mini-card-title">Budget</p>
            <p>100DT</p>
          </div>
        </Card>

        <Card>
          <div
            onClick={() =>
              generalModalOpen(3, {
                date: formatDate,
                type: type,
                montant: cash,
              })
            }
            className="mini-card-content"
          >
            <p className="mini-card-title">Cash</p>
            <p>{cash === "" ? "-" : `${cash}DT`}</p>
          </div>
        </Card>

        <Card>
          <div className="mini-card-content">
            <p className="mini-card-title">Dépenses</p>
            <p>100DT</p>
          </div>
        </Card>

        <Card>
          <div
            onClick={() =>
              generalModalOpen(4, {
                date: formatDate,
                type: type,
                montant: reintegre,
              })
            }
            className="mini-card-content"
          >
            <p className="mini-card-title">Réintégré</p>
            <p>{reintegre === "" ? "-" : `${reintegre}DT`}</p>
          </div>
        </Card>

        <Card>
          <div
            onClick={() =>
              generalModalOpen(2, {
                date: formatDate,
                type: type,
                montant: epargne,
              })
            }
            className="mini-card-content"
          >
            <p className="mini-card-title">Épargné</p>
            <p>{epargne === "" ? "-" : `${epargne}DT`}</p>
          </div>
        </Card>

        <Card>
          <div className="mini-card-content">
            <p className="mini-card-title">Reste</p>
            <p>100DT</p>
          </div>
        </Card>
      </div>
      <div className="Add-button-container">
        <div
          className="circle-btn"
          onClick={() =>
            generalModalOpen(0, { date: type === "jour" ? formatDate : "" })
          }
        >
          <BsPlus />
        </div>
      </div>
      <Card>
        <Table headers={week} content={content} mobile={["Commentaire"]} />
      </Card>

      <Modal show={show[0]} closeFunction={() => generalModalClose(0)}>
        <div className="depense-modal">
          <h1>Tu as encore depensé !</h1>
          <form onSubmit={addFormik.handleSubmit}>
            <Input
              type="number"
              onChange={addFormik.handleChange}
              value={addFormik.values.montant}
              id="montant"
              placeholder="Montant"
              error={addFormik.errors?.montant}
            />
            <Input
              type="text"
              onChange={addFormik.handleChange}
              value={addFormik.values.commentaire}
              id="commentaire"
              placeholder="Commentaire"
              error={addFormik.errors?.commentaire}
            />
            {type !== "jour" ? (
              <Input
                type={type}
                date={date}
                onChange={(e) => addFormik.setFieldValue("date", e)}
                value={addFormik.values.date}
                id="date"
                placeholder="Date"
                error={addFormik.errors?.date}
              />
            ) : null}
            <div className="modal-btn-container">
              <button className="round-btn">Confirmer</button>
              <div onClick={() => generalModalClose(0)} className="round-btn">
                Annuler
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Modal show={show[1]} closeFunction={() => generalModalClose(1)}>
        <div className="depense-modal">
          <h1>Encore une modification ?</h1>
          <form onSubmit={editFormik.handleSubmit}>
            <Input
              type="number"
              onChange={editFormik.handleChange}
              value={editFormik.values.montant}
              id="montant"
              placeholder="Montant"
              error={editFormik.errors?.montant}
            />
            <Input
              type="text"
              onChange={editFormik.handleChange}
              value={editFormik.values.commentaire}
              id="commentaire"
              placeholder="Commentaire"
              error={editFormik.errors?.commentaire}
            />
            <div className="modal-btn-container">
              <button className="round-btn">Confirmer</button>
              <div onClick={() => generalModalClose(1)} className="round-btn">
                Annuler
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <Modal show={show[2]} closeFunction={() => generalModalClose(2)}>
        <div className="depense-modal">
          <h1>Qui n'épargne pas un sou n'en aura jamais deux !</h1>
          <form onSubmit={epargneFormik.handleSubmit}>
            <Input
              type="number"
              onChange={epargneFormik.handleChange}
              value={epargneFormik.values.montant}
              id="montant"
              placeholder="Montant"
              error={epargneFormik.errors?.montant}
            />
            <div className="modal-btn-container">
              <button className="round-btn">Confirmer</button>
              <div onClick={() => generalModalClose(2)} className="round-btn">
                Annuler
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Modal show={show[3]} closeFunction={() => generalModalClose(3)}>
        <div className="depense-modal">
          <h1>Le cash est à l'entreprise ce que le sang est à l'organisme!</h1>
          <form onSubmit={cashFormik.handleSubmit}>
            <Input
              type="number"
              onChange={cashFormik.handleChange}
              value={cashFormik.values.montant}
              id="montant"
              placeholder="Montant"
              error={cashFormik.errors?.montant}
            />
            <div className="modal-btn-container">
              <button className="round-btn">Confirmer</button>
              <div onClick={() => generalModalClose(3)} className="round-btn">
                Annuler
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Modal show={show[4]} closeFunction={() => generalModalClose(4)}>
        <div className="depense-modal">
          <h1>Le cash est à l'entreprise ce que le sang est à l'organisme!</h1>
          <form onSubmit={reintegreFormik.handleSubmit}>
            <Input
              type="number"
              onChange={reintegreFormik.handleChange}
              value={reintegreFormik.values.montant}
              id="montant"
              placeholder="Montant"
              error={reintegreFormik.errors?.montant}
            />
            <div className="modal-btn-container">
              <button className="round-btn">Confirmer</button>
              <div onClick={() => generalModalClose(4)} className="round-btn">
                Annuler
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <ConfirmModal
        show={show[5]}
        closeFunction={() => generalModalClose(5)}
        text="Voulez vous supprimer cet element ?"
      />
    </div>
  );
}
