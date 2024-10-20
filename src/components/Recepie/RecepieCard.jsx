import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RecepieCard({ recipe }) {
  const { Meta } = Card;
  const navigate = useNavigate();

  return (
    <>
      
        <div>
          <Card
            key={recipe.id}
            style={{
              width: 300,
            }}
            cover={<img alt="Recepie Image" src={recipe.imageUrl} />}
            actions={[
              <Link to={`/recepie/${recipe.id}`}> <DeleteOutlined
                key="delete"
                onClick={() => {
                  deleteRecepie(recipe.id);
                }}
              /></Link>,
            ]}
          >
            <Meta title={recipe.tittle} description={recipe.description} />
          </Card>
        </div>
      
    </>
  );
}

export default RecepieCard;
