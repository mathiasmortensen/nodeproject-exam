import toastr from 'toastr';

export async function fetchGet(endpoint) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
      credentials: 'include'
    });
    return response;
  } catch {
    toastr.error('An error occurred while trying to GET');
  }
}

export async function fetchPost(endpoint, body) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    return response;
  } catch {
    toastr.error('An error occurred while trying to POST');
  }
}

export async function fetchPatch(endpoint, body) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    });
    return response;
  } catch {
    toastr.error('An error occurred while trying to PATCH');
  }
}

export async function fetchDelete(endpoint) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    return response;
  } catch {
    toastr.error('An error occurred while trying to DELETE');
  }
}
