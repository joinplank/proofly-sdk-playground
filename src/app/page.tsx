'use client';

import PlankProofly from '@plank-proofly/api';
import { useState } from 'react';
import type { ActionResult } from './actions';
import * as Actions from './actions';

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://ai-accelerator-hackathon-backend-bitter-bird-9940.fly.dev/api');

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Proofly SDK Test Console (Next.js)</h1>
        <p className="text-gray-600 mb-8">Test interface for Proofly API endpoints using @plank-proofly/api SDK</p>

        {/* Configuration */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">X-API-Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API Key"
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base URL</label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-black"
              />
            </div>
          </div>
        </div>

        <HealthCheck apiKey={apiKey} baseUrl={baseUrl} />
        <CompareImages apiKey={apiKey} baseUrl={baseUrl} />
        <CheckFriends apiKey={apiKey} baseUrl={baseUrl} />
        <MutualFriends apiKey={apiKey} baseUrl={baseUrl} />
        <SearchProfiles apiKey={apiKey} baseUrl={baseUrl} />
        <FuzzySearch apiKey={apiKey} baseUrl={baseUrl} />
        <FuzzyBatchSearch apiKey={apiKey} baseUrl={baseUrl} />
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

function HealthCheck({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [result, setResult] = useState<ActionResult<PlankProofly.HealthCheckResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    const res = await Actions.checkHealthAction(apiKey, baseUrl);
    setResult(res);
    setLoading(false);
  };

  return (
    <Section title="Health Check" endpoint="GET /health" onAction={handleAction} result={result} loading={loading}>
      <p className="text-sm text-gray-600">Check service availability.</p>
    </Section>
  );
}

function CompareImages({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [instr, setInstr] = useState('');
  const [result, setResult] = useState<ActionResult<PlankProofly.CompareImageCompareResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    const res = await Actions.compareImagesAction(apiKey, baseUrl, {
      imageUrl1: img1,
      imageUrl2: img2,
      additionalInstructions: instr || undefined
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <Section title="Compare Images" endpoint="POST /compare-images" onAction={handleAction} result={result} loading={loading}>
      <div className="grid grid-cols-1 gap-4">
        <Input label="Image URL 1 (Required)" value={img1} onChange={setImg1} placeholder="https://..." />
        <Input label="Image URL 2 (Required)" value={img2} onChange={setImg2} placeholder="https://..." />
        <TextArea label="Additional Instructions" value={instr} onChange={setInstr} />
      </div>
    </Section>
  );
}

function CheckFriends({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [target, setTarget] = useState('');
  const [candidates, setCandidates] = useState('');
  const [result, setResult] = useState<ActionResult<PlankProofly.CheckFacebookFriendCheckResponse> | null>(null);
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
    <Section title="Check Facebook Friends" endpoint="POST /check-facebook-friends" onAction={handleAction} result={result} loading={loading}>
      <Input label="Target Facebook ID (Required)" value={target} onChange={setTarget} />
      <TextArea label="Candidate IDs (Required, comma separated)" value={candidates} onChange={setCandidates} placeholder="id1, id2" />
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
    <Section title="Find Mutual Friends" endpoint="POST /find-mutual-friends" onAction={handleAction} result={result} loading={loading}>
      <TextArea label="User IDs (Required, comma separated)" value={ids} onChange={setIds} placeholder="id1, id2" />
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
      additionalInstructions: form.instr || undefined
    };
    if (form.associates) {
      params.knownAssociates = form.associates.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    const res = await Actions.searchProfilesAction(apiKey, baseUrl, params);
    setResult(res);
    setLoading(false);
  };

  return (
    <Section title="Search Profiles" endpoint="POST /profiles/search" onAction={handleAction} result={result} loading={loading}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Name (Required)" value={form.name || ''} onChange={v => handleChange('name', v)} />
        <Input label="Email" value={form.email || ''} onChange={v => handleChange('email', v)} />
        <Input label="Birth Year" type="number" value={form.birthYear || ''} onChange={v => handleChange('birthYear', v)} />
        <Input label="Date of Birth (YYYY-MM-DD)" type="date" value={form.dob || ''} onChange={v => handleChange('dob', v)} />
        <Input label="Location" value={form.location || ''} onChange={v => handleChange('location', v)} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
          <select
            value={form.subCategory}
            onChange={e => handleChange('subCategory', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm text-black"
          >
            <option value="">Select...</option>
            <option value="hometown">Hometown</option>
            <option value="current">Current</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <Input label="Photo URL" value={form.photoUrl || ''} onChange={v => handleChange('photoUrl', v)} />
        </div>
        <div className="md:col-span-2">
          <TextArea label="Known Associates (comma separated)" value={form.associates || ''} onChange={v => handleChange('associates', v)} />
        </div>
        <div className="md:col-span-2">
          <TextArea label="Additional Instructions" value={form.instr || ''} onChange={v => handleChange('instr', v)} />
        </div>
      </div>
    </Section>
  );
}

function FuzzySearch({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [type, setType] = useState<string>('name');
  const [value, setValue] = useState('');
  const [hint, setHint] = useState('');
  const [subCat, setSubCat] = useState('');
  const [instr, setInstr] = useState('');
  const [result, setResult] = useState<ActionResult<PlankProofly.FuzzySearchSuggestResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    const params: PlankProofly.FuzzySearchSuggestParams = {
      type: type as 'name' | 'location' | 'occupation' | 'email',
      value,
      additionalInstructions: instr || undefined
    };
    if (hint || subCat) {
      params.context = {
        hint: hint || undefined,
        subCategory: (subCat as 'hometown' | 'current') || undefined
      };
    }
    const res = await Actions.fuzzySearchSuggestAction(apiKey, baseUrl, params);
    setResult(res);
    setLoading(false);
  };

  return (
    <Section title="Fuzzy Search" endpoint="POST /fuzzy-search" onAction={handleAction} result={result} loading={loading}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm text-black"
          >
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="occupation">Occupation</option>
            <option value="email">Email</option>
          </select>
        </div>
        <Input label="Value (Required)" value={value} onChange={setValue} />
        <Input label="Context Hint" value={hint} onChange={setHint} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Context Sub Category</label>
          <select
            value={subCat}
            onChange={e => setSubCat(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm text-black"
          >
            <option value="">Select...</option>
            <option value="hometown">Hometown</option>
            <option value="current">Current</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <TextArea label="Additional Instructions" value={instr} onChange={setInstr} />
        </div>
      </div>
    </Section>
  );
}

function FuzzyBatchSearch({ apiKey, baseUrl }: { apiKey: string, baseUrl: string }) {
  const [json, setJson] = useState('');
  const [result, setResult] = useState<ActionResult<PlankProofly.FuzzySearchSuggestBatchResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    try {
      const requests = JSON.parse(json);
      const res = await Actions.fuzzySearchBatchAction(apiKey, baseUrl, { requests });
      setResult(res);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setResult({ success: false, error: 'Invalid JSON: ' + message });
    }
    setLoading(false);
  };

  return (
    <Section title="Fuzzy Search Batch" endpoint="POST /fuzzy-search/batch" onAction={handleAction} result={result} loading={loading}>
      <TextArea
        label="Requests JSON (Array of objects)"
        value={json}
        onChange={setJson}
        placeholder='[{"type": "name", "value": "John"}, {"type": "location", "value": "NY"}]'
        rows={6}
      />
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
    <Section title="Verify Profile Photo" endpoint="POST /verify-profile-photo" onAction={handleAction} result={result} loading={loading}>
      <div className="grid grid-cols-1 gap-4">
        <Input label="Photo URL (Required)" value={photo} onChange={setPhoto} />
        <Input label="Profile URL (Required)" value={profile} onChange={setProfile} />
        <TextArea label="Additional Instructions" value={instr} onChange={setInstr} />
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
    <Section title="Get Job Status" endpoint="GET /jobs/{jobId}" onAction={handleAction} result={result} loading={loading}>
      <Input label="Job ID (UUID)" value={jobId} onChange={setJobId} placeholder="uuid..." />
    </Section>
  );
}

interface InputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}

function Input({ label, value, onChange, type = "text", placeholder }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
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
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }: TextAreaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
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
