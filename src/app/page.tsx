'use client';

import PlankProofly from '@plank-proofly/api';
import { useState } from 'react';
import type { ActionResult } from './actions';
import * as Actions from './actions';

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const baseUrl = 'https://api.proofly.joinplank.com';

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Proofly SDK Playground Console (Next.js)</h1>
            <p className="text-gray-600">Playground interface for Proofly API endpoints using @plank-proofly/api SDK</p>
          </div>
          <a
            href="https://github.com/joinplank/proofly-sdk-playground"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span>View on GitHub</span>
          </a>
        </div>

        {/* Configuration */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">X-API-Key</label>
              <input
                type='text'
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API Key"
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-black"
              />
            </div>
          </div>
        </div>

        <FindFriends apiKey={apiKey} baseUrl={baseUrl} />
        <CheckFriends apiKey={apiKey} baseUrl={baseUrl} />
        <MutualFriends apiKey={apiKey} baseUrl={baseUrl} />
        <SearchByLocationOccupation apiKey={apiKey} baseUrl={baseUrl} />
        <SearchProfiles apiKey={apiKey} baseUrl={baseUrl} />
        <ConnectionGraph apiKey={apiKey} baseUrl={baseUrl} />
        <ProfileInteractions apiKey={apiKey} baseUrl={baseUrl} />
        <VerifyPhoto apiKey={apiKey} baseUrl={baseUrl} />
        <JobStatus apiKey={apiKey} baseUrl={baseUrl} />
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  endpoint: string;
  children: React.ReactNode;
  onAction: () => void;
  result: ActionResult<unknown> | null;
  loading: boolean;
}

function Section({ title, endpoint, children, onAction, result, loading }: SectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      <div className="text-sm text-gray-500 mb-4 font-mono">{endpoint}</div>
      <div className="space-y-4">
        {children}
        <button
          onClick={onAction}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Execute'}
        </button>
      </div>
      {result && (
        <pre className={`mt-4 p-4 rounded-md overflow-auto text-sm ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {JSON.stringify(result.success ? result.data : result.error, null, 2)}
        </pre>
      )}
    </div>
  );
}

function FindFriends({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [target, setTarget] = useState('');
  const [result, setResult] = useState<ActionResult<PlankProofly.GetFacebookFriendCreateResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);

    const res = await Actions.getFacebookFriendsAction(apiKey, baseUrl, {
      targetFacebookId: target,
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <Section title="Get Facebook Friends" endpoint="POST /api/get-facebook-friends" onAction={handleAction} result={result} loading={loading}>
      <Input
        label="Facebook Profile or Username (Required)"
        value={target}
        onChange={setTarget}
        placeholder="e.g., john.smith or 10001234567890"
        description="Enter the person's Facebook username (like john.smith) or their profile ID number. This is the profile whose friends list you want to retrieve."
      />
    </Section>
  );
}

function CheckFriends({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [target, setTarget] = useState('');
  const [candidates, setCandidates] = useState('');
  const [result, setResult] = useState<ActionResult<PlankProofly.CheckFacebookFriendCreateResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    const candidateList = candidates.split(',').map(s => s.trim()).filter(Boolean);
    const res = await Actions.checkFacebookFriendsAction(apiKey, baseUrl, {
      targetFacebookId: target,
      candidateIds: candidateList
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <Section title="Check Facebook Friends" endpoint="POST /api/check-facebook-friends" onAction={handleAction} result={result} loading={loading}>
      <Input
        label="Target Facebook Profile or Username (Required)"
        value={target}
        onChange={setTarget}
        placeholder="e.g., john.smith or 10001234567890"
        description="Enter the Facebook username or profile ID of the person you want to check. This is the main profile whose friends list will be checked."
      />
      <TextArea
        label="Profiles to Check (Required, comma separated)"
        value={candidates}
        onChange={setCandidates}
        placeholder="jane.doe, bob.jones or 10001234567891, 10001234567892"
        description="Enter the Facebook usernames or profile IDs of the people you want to check if they're friends with the target profile. Separate multiple entries with commas. Useful for verifying relationships and connections."
      />
    </Section>
  );
}

function MutualFriends({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [ids, setIds] = useState('');
  const [result, setResult] = useState<ActionResult<PlankProofly.FindMutualFriendCreateResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    const idList = ids.split(',').map(s => s.trim()).filter(Boolean);
    const res = await Actions.findMutualFriendsAction(apiKey, baseUrl, {
      userIds: idList
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <Section title="Find Mutual Friends" endpoint="POST /api/find-mutual-friends" onAction={handleAction} result={result} loading={loading}>
      <TextArea
        label="Facebook Profiles or Usernames (Required, comma separated, minimum 2)"
        value={ids}
        onChange={setIds}
        placeholder="john.smith, jane.doe, bob.jones or 10001234567890, 10001234567891"
        description="Enter at least two Facebook usernames or profile IDs separated by commas. The tool will find friends that are common to all the profiles you list."
      />
    </Section>
  );
}

interface ProfileSearchForm {
  name: string;
  email?: string;
  birthYear?: string;
  dob?: string;
  location?: string;
  subCategory?: string;
  photoUrl?: string;
  associates?: string;
  minConfidenceScore?: string;
  instr?: string;
}

function SearchProfiles({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [form, setForm] = useState<ProfileSearchForm>({ name: '', subCategory: '' });
  const [result, setResult] = useState<ActionResult<PlankProofly.ProfileSearchResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof ProfileSearchForm, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleAction = async () => {
    setLoading(true);
    const params: PlankProofly.ProfileSearchParams = {
      name: form.name,
      email: form.email || undefined,
      birthYear: form.birthYear ? parseInt(form.birthYear) : undefined,
      dateOfBirth: form.dob || undefined,
      location: form.location || undefined,
      subCategory: (form.subCategory as 'hometown' | 'current') || undefined,
      photoUrl: form.photoUrl || undefined,
      additionalInstructions: form.instr || undefined,
      minConfidenceScore: form.minConfidenceScore ? parseFloat(form.minConfidenceScore) : undefined
    };
    if (form.associates) {
      params.knownAssociates = form.associates.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    const res = await Actions.searchProfilesAction(apiKey, baseUrl, params);
    setResult(res);
    setLoading(false);
  };

  return (
    <Section title="Search Profiles" endpoint="POST /api/profiles/search" onAction={handleAction} result={result} loading={loading}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Name (Required)"
          value={form.name || ''}
          onChange={v => handleChange('name', v)}
          placeholder="e.g., John Doe"
          description="Full name or partial name to search for"
        />
        <Input
          label="Email"
          value={form.email || ''}
          onChange={v => handleChange('email', v)}
          placeholder="john.doe@example.com"
          description="Email address associated with the profile"
        />
        <Input
          label="Birth Year"
          type="number"
          value={form.birthYear || ''}
          onChange={v => handleChange('birthYear', v)}
          placeholder="e.g., 1990"
          description="Year of birth (1900-2025) to narrow down search results"
        />
        <Input
          label="Date of Birth"
          type="date"
          value={form.dob || ''}
          onChange={v => handleChange('dob', v)}
          description="Select the person's exact date of birth to help find the right match"
        />
        <Input
          label="Location"
          value={form.location || ''}
          onChange={v => handleChange('location', v)}
          placeholder="e.g., New York, NY or San Francisco"
          description="City or location name (minimum 2 characters). Use subcategory below to specify hometown vs current location"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location Sub Category
            <span className="ml-2 text-xs text-gray-500 font-normal">(for location field)</span>
          </label>
          <select
            value={form.subCategory}
            onChange={e => handleChange('subCategory', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm text-black"
          >
            <option value="">Select location type...</option>
            <option value="hometown">Hometown</option>
            <option value="current">Current Location</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <Input
            label="Photo URL"
            value={form.photoUrl || ''}
            onChange={v => handleChange('photoUrl', v)}
            placeholder="https://example.com/photo.jpg"
            description="Paste the web address (URL) of a photo of the person. The system will use facial recognition to find profiles that match this photo."
          />
        </div>
        <div className="md:col-span-2">
          <TextArea
            label="Known Associates (comma separated, max 20)"
            value={form.associates || ''}
            onChange={v => handleChange('associates', v)}
            placeholder="Jane Smith, Bob Johnson"
            description="Enter the names of people who might be friends or connected to the person you're looking for. This helps narrow down results by finding profiles with similar social connections."
          />
        </div>
        <div className="md:col-span-2">
          <Input
            label="Minimum Confidence Score (0.0 to 1.0)"
            type="number"
            step="0.1"
            value={form.minConfidenceScore || ''}
            onChange={v => handleChange('minConfidenceScore', v)}
            placeholder="e.g., 0.8"
            description="Filter results by how confident the match is. Use a value between 0.0 and 1.0. Higher numbers (like 0.8 or 0.9) show fewer results but they're more likely to be accurate matches."
          />
        </div>
        <div className="md:col-span-2">
          <TextArea
            label="Additional Instructions"
            value={form.instr || ''}
            onChange={v => handleChange('instr', v)}
            placeholder="Any extra details that might help find the right person..."
            description="Add any additional information that could help narrow down the search, such as specific details about the person, their interests, or other identifying information."
          />
        </div>
      </div>
    </Section>
  );
}

function SearchByLocationOccupation({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [occupation, setOccupation] = useState('');
  const [result, setResult] = useState<ActionResult<PlankProofly.SearchByLocationOccupationCreateResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    const res = await Actions.searchByLocationOccupationAction(apiKey, baseUrl, {
      city,
      state: state || undefined,
      occupation
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <Section title="Search by Location and Occupation" endpoint="POST /api/search-by-location-occupation" onAction={handleAction} result={result} loading={loading}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="City (Required)"
          value={city}
          onChange={setCity}
          placeholder="e.g., San Francisco"
          description="City name to search for profiles"
        />
        <Input
          label="State (Optional)"
          value={state}
          onChange={setState}
          placeholder="e.g., CA or California"
          description="State name or abbreviation to narrow down location search"
        />
        <div className="md:col-span-2">
          <Input
            label="Occupation (Required)"
            value={occupation}
            onChange={setOccupation}
            placeholder="e.g., Software Engineer, Doctor, Teacher"
            description="Enter the job title or profession to search for. The system will find all profiles matching this occupation in the specified location."
          />
        </div>
      </div>
    </Section>
  );
}

interface ConnectionGraphProfile {
  name: string;
  email?: string;
  birthYear?: string;
  dob?: string;
  location?: string;
  subCategory?: string;
  photoUrl?: string;
  associates?: string;
}

function ConnectionGraph({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [profilesJson, setProfilesJson] = useState('');
  const [location, setLocation] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [result, setResult] = useState<ActionResult<PlankProofly.ProfileConnectionGraphCreateResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    try {
      const profiles: PlankProofly.ProfileSearchParams[] = JSON.parse(profilesJson);
      const params: PlankProofly.ProfileConnectionGraphCreateParams = {
        profiles,
        globalFilters: (location || subCategory) ? {
          location: location || undefined,
          subCategory: (subCategory as 'hometown' | 'current') || undefined
        } : undefined
      };
      const res = await Actions.buildConnectionGraphAction(apiKey, baseUrl, params);
      setResult(res);
    } catch (error) {
      setResult({ success: false, error: 'Invalid JSON format for profiles array' });
    }
    setLoading(false);
  };

  return (
    <Section title="Build Connection Graph" endpoint="POST /api/profiles/connection-graph" onAction={handleAction} result={result} loading={loading}>
      <div className="space-y-4">
        <TextArea
          label="Profiles to Search (Required, JSON format, max 100)"
          value={profilesJson}
          onChange={setProfilesJson}
          placeholder={`[\n  { "name": "John Doe", "location": "New York" },\n  { "name": "Jane Smith", "email": "jane@example.com" }\n]`}
          description="Enter a list of profiles to search for in JSON format. Each profile needs at least a name, and you can add other details like location, email, etc. The system will find how all these profiles are connected to each other through their friends."
          rows={8}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Global Location Filter (Optional)"
            value={location}
            onChange={setLocation}
            placeholder="e.g., New York"
            description="If you want to filter all profiles by a specific location, enter it here"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Global Location Sub Category
              <span className="ml-2 text-xs text-gray-500 font-normal">(for global location filter)</span>
            </label>
            <select
              value={subCategory}
              onChange={e => setSubCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-black"
            >
              <option value="">Select...</option>
              <option value="hometown">Hometown</option>
              <option value="current">Current</option>
            </select>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProfileInteractions({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [profileId, setProfileId] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [postLimit, setPostLimit] = useState('5');
  const [result, setResult] = useState<ActionResult<PlankProofly.ProfileInteractionCreateResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    const params: PlankProofly.ProfileInteractionCreateParams = {
      ...(profileId ? { profileId } : {}),
      ...(profileUrl ? { profileUrl } : {}),
      postLimit: postLimit ? parseInt(postLimit) : 5
    };
    const res = await Actions.fetchProfileInteractionsAction(apiKey, baseUrl, params);
    setResult(res);
    setLoading(false);
  };

  return (
    <Section title="Fetch Profile Interactions" endpoint="POST /api/profile-interactions" onAction={handleAction} result={result} loading={loading}>
      <div className="space-y-4">
        <Input
          label="Facebook Profile or Username (Optional)"
          value={profileId}
          onChange={setProfileId}
          placeholder="e.g., john.smith or 10001234567890"
          description="Enter the person's Facebook username or profile ID. You can use either this field or the Profile URL field below."
        />
        <Input
          label="Profile URL (Optional)"
          value={profileUrl}
          onChange={setProfileUrl}
          placeholder="https://www.facebook.com/john.smith"
          description="Enter the full Facebook profile URL (the web address when you visit someone's profile). You can use either this field or the Profile/Username field above."
        />
        <Input
          label="Number of Posts to Check (1-20, default: 5)"
          type="number"
          value={postLimit}
          onChange={setPostLimit}
          placeholder="5"
          description="Choose how many recent posts to check for likes and comments. The system will analyze interactions on up to this many posts."
        />
      </div>
    </Section>
  );
}

function VerifyPhoto({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [photo, setPhoto] = useState('');
  const [profile, setProfile] = useState('');
  const [instr, setInstr] = useState('');
  const [result, setResult] = useState<ActionResult<PlankProofly.VerifyProfilePhotoVerifyResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    const res = await Actions.verifyProfilePhotoAction(apiKey, baseUrl, {
      photoUrl: photo,
      profileUrl: profile,
      additionalInstructions: instr || undefined
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <Section title="Verify Profile Photo" endpoint="POST /api/verify-profile-photo" onAction={handleAction} result={result} loading={loading}>
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Photo URL (Required)"
          value={photo}
          onChange={setPhoto}
          placeholder="https://example.com/verification-photo.jpg"
          description="Paste the web address (URL) of the photo you want to verify. This is the photo you're checking to see if it matches the Facebook profile."
        />
        <Input
          label="Facebook Profile URL (Required)"
          value={profile}
          onChange={setProfile}
          placeholder="https://www.facebook.com/john.smith"
          description="Paste the full Facebook profile web address (URL) of the person. The system will compare your photo against all photos on this Facebook profile to see if there's a match."
        />
        <TextArea
          label="Additional Instructions"
          value={instr}
          onChange={setInstr}
          placeholder="Any extra details about the photo comparison..."
          description="Add any additional information that could help with the photo comparison, such as the age of the photo, specific features to focus on, or other relevant context. This is useful for identity verification processes."
        />
      </div>
    </Section>
  );
}

function JobStatus({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [jobId, setJobId] = useState('');
  const [result, setResult] = useState<ActionResult<PlankProofly.JobRetrieveStatusResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!jobId) return;
    setLoading(true);
    const res = await Actions.getJobStatusAction(apiKey, baseUrl, jobId);
    setResult(res);
    setLoading(false);
  };

  return (
    <Section title="Get Job Status" endpoint="GET /api/jobs/{jobId}" onAction={handleAction} result={result} loading={loading}>
      <Input
        label="Job ID"
        value={jobId}
        onChange={setJobId}
        placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000"
        description="Enter the job ID number you received when you submitted a request. Use this to check the status of your request and get the results once it's finished processing."
      />
    </Section>
  );
}

interface InputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  description?: string;
}

function Input({ label, value, onChange, type = "text", placeholder, description }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {description && (
        <p className="text-xs text-gray-500 mb-1.5">{description}</p>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md text-sm text-black"
      />
    </div>
  )
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  description?: string;
}

function TextArea({ label, value, onChange, placeholder, rows = 3, description }: TextAreaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {description && (
        <p className="text-xs text-gray-500 mb-1.5">{description}</p>
      )}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-2 border border-gray-300 rounded-md text-sm text-black font-mono"
      />
    </div>
  )
}
