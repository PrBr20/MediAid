import React from "react";
import { useEffect, useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { BASE_URL } from "@/config";
import AvgStar from "@/assets/images/avgstar.png";
import { Badge } from "@/components/ui/badge";
import CategoryIcon from "@/assets/images/category.svg";
import ShopIcon from "@/assets/images/shop.svg";
import DiseaseIcon from "@/assets/images/diseaseIcon.svg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { set } from "lodash";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { state, setState } = useContext(AuthContext);
  const [cart, setCart] = useState(null);

  const navigate = useNavigate();

  const [totalprice, setTotalPrice] = useState(0);
  const [editmode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch(`${BASE_URL}/cart/fetchcart/${state.user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      setCart(result.data.medicines);
      setTotalPrice(result.data.totalPrice);
    };

    fetchCart();
  }, []);

  console.log(totalprice);
  console.log(cart);

  const onToken = (token) => {
    console.log(token);

    const completeOrder = async () => {
      const res = await fetch(`${BASE_URL}/cart/complete/${state.user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify({ transactionId: "asdf1234" }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      setState({ ...state, cartSize: 0 });

      navigate("/user/orders");
    };

    completeOrder();
  };

  const handleSaveChange = async (e) => {
    e.preventDefault();
    setEditMode(false);
    let postbody = [];
    cart.forEach((med) => {
      postbody.push({
        medicineId: med.medicine._id,
        unit: med.unit,
        unitPrice: med.unitPrice,
        qty: med.qty,
      });
    });

    const res = await fetch(`${BASE_URL}/cart/replace/${state.user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify({ medicines: postbody }),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message);
    }

    console.log(result.data);

    setCart(result.data.medicines);
    setTotalPrice(result.data.totalPrice);

    setState({ ...state, cartSize: result.data.medicines.length });
  };

  return (
    cart != null && (
      <div className="mx-[140px] mt-[40px] flex space-x-10 justify-between">
        <div className="w-3/4 flex-col space-y-2">
          <h1 className="text-5xl font-bold">Shopping Cart</h1>
          <hr className="border border-black" />
          <h1 className="italic text-gray-500 font-bold">
            {cart?.length} items in the cart
          </h1>
          {!editmode && (
            <div className="flex justify-end">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setEditMode(true);
                }}
              >
                Edit Cart
              </Button>
            </div>
          )}
          <div className="flex-col space-y-3">
            {cart.map((med, index) => (
              <div
                key={index}
                className="flex my-[10px] h-[150px] rounded-lg border border-slate-400 overflow-hidden"
              >
                <div className="w-1/3 h-full">
                  <img
                    src={med.medicine.image}
                    alt="Doctor"
                    className="top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-[20px]">
                  <div className="flex justify-between">
                    <div className="flex-col w-2/3">
                      <h1 className="font-bold text-xl">{med.medicine.name}</h1>
                      <div className="flex space-x-1">
                        <img
                          src={CategoryIcon}
                          className="w-[20px] h-[20px]"
                          alt=""
                        />
                        <p className="font-bold text-sm">
                          {med.medicine.category}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <img
                          src={ShopIcon}
                          className="w-[20px] h-[20px]"
                          alt=""
                        />
                        <p className="font-bold text-xs pt-1">
                          {med.medicine.manufacturer.name}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <img
                          src={DiseaseIcon}
                          className="w-[20px] h-[20px]"
                          alt=""
                        />
                        <p className="font-bold text-xs pt-1">
                          {med.medicine.disease}
                        </p>
                      </div>
                    </div>

                    <div className="flex-col w-1/3 space-y-1">
                      {editmode && (
                        <div className="flex items-center justify-center">
                          <Button
                            className="w-1/3 h-[25px] text-xl"
                            onClick={(e) => {
                              e.preventDefault();
                              let updatedCart = [...cart];
                              if (updatedCart[index].qty > 1) {
                                updatedCart[index].qty =
                                  updatedCart[index].qty - 1;
                                setTotalPrice(
                                  totalprice - parseFloat(med.unitPrice)
                                );
                              }
                              setCart(updatedCart);
                            }}
                          >
                            -
                          </Button>
                          <h1 className="text-center w-1/3">{med.qty}</h1>
                          <Button
                            className="w-1/3 h-[25px] text-xl"
                            onClick={(e) => {
                              e.preventDefault();
                              let updatedCart = [...cart];
                              updatedCart[index].qty =
                                updatedCart[index].qty + 1;
                              setTotalPrice(
                                totalprice + parseFloat(med.unitPrice)
                              );
                              setCart(updatedCart);
                            }}
                          >
                            +
                          </Button>
                        </div>
                      )}
                      <div>
                        <h1 className="text-sm font-bold">Unit : {med.unit}</h1>
                        <h1 className="text-xs font-bold text-gray-400">
                          Base Price : {med.unitPrice} Taka
                        </h1>
                        <h1 className="text-xs font-bold">
                          Total Price :{" "}
                          {(
                            parseFloat(med.unitPrice) * parseInt(med.qty)
                          ).toFixed(2)}{" "}
                          Taka
                        </h1>
                      </div>
                      {editmode && (
                        <Button
                          className="w-full h-[30px] bg-red-500"
                          onClick={() => {
                            setCart(cart.filter((item, idx) => idx !== index));
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {editmode && (
            <div className="flex justify-end">
              <Button onClick={(e) => handleSaveChange(e)}>Save Changes</Button>
            </div>
          )}
        </div>
        <div className="w-1/4 flex-col space-y-2">
          <h1 className="font-bold text-2xl">Order Summary : </h1>
          <hr className="border border-gray" />
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                <div className="flex-col">
                  <p>Total Amount : </p>
                  <p>{totalprice.toFixed(2)} BDT</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StripeCheckout
                stripeKey="pk_test_51OqEoBJp2O3nTHsUqofo4BM2FNMYiT43ZdwhfWC1vkBve5gU5G7hpMUOYsDL8pOP0dGrArWqH5lgm7S4rt3mFiso0007cpU8Hy"
                token={onToken}
              >
                <Button className="w-full rounded-none">Checkout</Button>
              </StripeCheckout>
            </CardContent>
            <CardFooter>
              <div className="flex-col space-y-1 w-full">
                <h1 className="text-md font-bold">Promotions</h1>
                <hr className="border border-black w-full" />
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Enter Coupon"
                    className="w-2/3 rounded-none border-black"
                  />
                  <Button className="w-1/3 rounded-none">Apply</Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  );
};

export default Cart;
