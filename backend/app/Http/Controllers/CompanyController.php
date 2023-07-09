<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use App\Services\CompanyService;
use Illuminate\Http\Request;

class CompanyController extends Controller
{

    public function __construct(CompanyService $companyService)
    {
        $this->companyService = $companyService;
    }

    public function show()
    {
        // TODO: Pagination
        $userId = auth()->user()->id;
        $companies = Company::where('user_id', $userId)->get();

        return response()->json([
            'companies' => $companies
        ]);
    }

    public function getCompanyById($companyId)
    {
        $company = Company::find($companyId);

        if (! $company) {
            return response()->json([
                'message' => 'Company not found'
            ], 404);
        }

        return $company;
    }

    public function create(CompanyRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->user()->id;

        $company = Company::create($validated);

        return response()->json($company);
    }

    public function update(CompanyService $companyService, $companyId, CompanyRequest $request)
    {
        $validated = $request->validated();
        $company = Company::find($companyId);

        if (! $company) {
            return response()->json([
                'message' => 'Company not found'
            ], 404);
        }

        if ($company->user_id !== auth()->user()->id) {
            abort(403);
        }

        $company->update($validated);

        return $company;
    }

    public function delete($companyId)
    {
        $company = Company::find($companyId);

        if (! $company) {
            return response()->json([
                'message' => 'Company not found'
            ], 404);
        }

        $company->delete();

        return true;
    }
}
