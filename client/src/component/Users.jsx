import React, { useEffect, useState } from "react";
import withAuth from "../helpers/axios";
import { Card, CardText, CardBody } from "reactstrap";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    withAuth()
      .get("http://localhost:5000/api/users")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      {users.map(user => {
        return (
          <Card key={user.id} className="mt-4">
            <CardBody>
              <CardText>
                <strong>Username:</strong> {user.username}
              </CardText>
              <CardText>
                <strong>EncryptedPassword:</strong> {user.password}
              </CardText>
              <CardText>
                <strong>Department:</strong> {user.department}
              </CardText>
            </CardBody>
          </Card>
        );
      })}
    </>
  );
}

export default Users;
