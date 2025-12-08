'use server'

import PlankProofly from '@plank-proofly/api';

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// Helper to init client
function getClient(apiKey: string, baseURL: string) {
  return new PlankProofly({ apiKey, baseURL });
}

function handleError(error: unknown): { success: false; error: string } {
  const message = error instanceof Error ? error.message : String(error);
  return { success: false, error: message };
}

export async function checkFacebookFriendsAction(apiKey: string, baseURL: string, params: PlankProofly.CheckFacebookFriendCheckParams): Promise<ActionResult<PlankProofly.CheckFacebookFriendCheckResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.checkFacebookFriends.check(params);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}

export async function findMutualFriendsAction(apiKey: string, baseURL: string, params: PlankProofly.FindMutualFriendCreateParams): Promise<ActionResult<PlankProofly.FindMutualFriendCreateResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.findMutualFriends.create(params);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}

export async function searchProfilesAction(apiKey: string, baseURL: string, params: PlankProofly.ProfileSearchParams): Promise<ActionResult<PlankProofly.ProfileSearchResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.profiles.search(params);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}


export async function verifyProfilePhotoAction(apiKey: string, baseURL: string, params: PlankProofly.VerifyProfilePhotoVerifyParams): Promise<ActionResult<PlankProofly.VerifyProfilePhotoVerifyResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.verifyProfilePhoto.verify(params);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}

export async function getJobStatusAction(apiKey: string, baseURL: string, jobId: string): Promise<ActionResult<PlankProofly.JobRetrieveStatusResponse>> {
  try {
    const client = getClient(apiKey, baseURL);
    const data = await client.jobs.retrieveStatus(jobId);
    return { success: true, data };
  } catch (error) {
    return handleError(error);
  }
}

