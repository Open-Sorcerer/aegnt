"use server";

import dotenv from "dotenv";
dotenv.config();

const API_BASE = "https://nillion-storage-apis-v0.onrender.com";
const APP_ID = process.env.NILLION_APP_ID;

// Register the app to the Nillion Storage API
async function registerApp() {
  try {
    const response = await fetch(
      "https://nillion-storage-apis-v0.onrender.com/api/apps/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Store a secret using Nillion Storage API
export async function storeSecret(
  USER_SEED: string,
  SECRET_VALUE: Record<string, any>
) {
  try {
    if (!APP_ID) {
      throw new Error("NILLION_APP_ID environment variable is not set");
    }

    const response = await fetch(`${API_BASE}/api/apps/${APP_ID}/secrets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: {
          nillion_seed: USER_SEED,
          secret_value: JSON.stringify(SECRET_VALUE),
          secret_name: "mpc_secret",
        },
        permissions: {
          retrieve: [],
          update: [],
          delete: [],
          compute: {},
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error storing secret:", error);
    throw error;
  }
}

// Retrieve a secret using Nillion Storage API
export async function retrieveSecret(USER_SEED: string, store_id: string) {
  /* List all the stores of this registered app from Nillion */
  //   const storeId = await fetch(`${API_BASE}/api/apps/${APP_ID}/store_ids`)
  //     .then((res) => res.json())
  //     .then((data) => data);

  try {
    const response = await fetch(
      `${API_BASE}/api/secret/retrieve/${store_id}?retrieve_as_nillion_user_seed=${USER_SEED}&secret_name=mpc_secret`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const secret = (await response.json()) as Record<string, any>;
    return JSON.parse(secret.secret).secret;
  } catch (error) {
    console.error("Error retrieving secret:", error);
    throw error;
  }
}
