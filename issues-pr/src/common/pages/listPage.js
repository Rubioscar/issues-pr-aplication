import React, { useState, useCallback } from "react";
import { apiIssues } from "common/api";
import ListCards from "common/components/cards";
import DetailsIssue from "common/components/details";
import { useDispatch } from "react-redux";
import { setLoading } from "common/actions/loading";
import SimpleInput from "common/components/inputs/simpleInput";
import { modalStyle } from "common/constants";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const ListPage = React.memo(() => {
  const [issues, setIssues] = useState([]);
  const [modalView, setModalView] = useState(false);
  const [children, setChildren] = useState(null);
  const [search, setSearch] = useState({
    user: null,
    repo: null,
  });
  const dispatch = useDispatch();

  const handleOpenModal = useCallback(() => {
    setModalView(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setModalView(false);
  }, []);

  const onViewDatils = useCallback(
    (issue) => {
      dispatch(setLoading(true));
      apiIssues
        .comments(search.user, search.repo, issue)
        .then((resp) => {
          setChildren(
            <DetailsIssue
              issue={issues.find((e) => e.number === issue)}
              comments={resp.data}
            />
          );
          handleOpenModal();
        })
        .catch(() => null)
        .finally(() => dispatch(setLoading(false)));
    },
    [dispatch, search.user, search.repo, issues, handleOpenModal]
  );

  const onSearchRepoIssue = useCallback(() => {
    dispatch(setLoading(true));
    apiIssues
      .list(search.user, search.repo)
      .then((resp) => {
        setIssues(resp.data);
      })
      .catch(() => null)
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch, search.repo, search.user]);

  return (
    <>
      <div className="search">
        <SimpleInput
          type="text"
          label="User"
          value={search.user}
          onChange={(value) => setSearch({ ...search, user: value })}
        />
        <SimpleInput
          type="text"
          label="Repository"
          value={search.repo}
          onChange={(value) => setSearch({ ...search, repo: value })}
        />
        <Button variant="contained" onClick={onSearchRepoIssue}>
          Search
        </Button>
      </div>
      <ListCards listProducts={issues} onViewDatils={onViewDatils} />
      <Modal
        open={modalView}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...modalStyle }}>{children}</Box>
      </Modal>
    </>
  );
});

export default ListPage;
