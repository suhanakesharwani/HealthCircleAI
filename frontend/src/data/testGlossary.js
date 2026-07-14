// Plain-language descriptions of what each test measures — not what a result
// means for any individual. Keyed by normalized test name (lowercase, spaces
// as underscores) to match `normalize_test_name` in the backend.
export const TEST_GLOSSARY = {
    // CBC
    hemoglobin: "The protein in red blood cells that carries oxygen around your body.",
    hb: "The protein in red blood cells that carries oxygen around your body.",
    rbc_count: "The number of red blood cells in your blood, which carry oxygen from your lungs to the rest of your body.",
    wbc_count: "The number of white blood cells, which are part of your immune system and help fight infection.",
    platelet_count: "The number of platelets in your blood — small cells that help your blood clot to stop bleeding.",
    rdw: "Red Cell Distribution Width — measures how much variation there is in the size of your red blood cells. Normally, red blood cells are fairly uniform in size.",
    mcv: "Mean Corpuscular Volume — the average size of your red blood cells.",
    mch: "Mean Corpuscular Hemoglobin — the average amount of hemoglobin inside each red blood cell.",
    mchc: "Mean Corpuscular Hemoglobin Concentration — how concentrated the hemoglobin is inside your red blood cells.",
    hematocrit: "The percentage of your blood that is made up of red blood cells.",
    neutrophils: "A type of white blood cell that is usually the first responder against bacterial infections.",
    lymphocytes: "A type of white blood cell that helps your body fight viral infections and supports long-term immunity.",
    monocytes: "A type of white blood cell that helps clean up damaged tissue and fight infection.",
    eosinophils: "A type of white blood cell often involved in allergic reactions and fighting parasites.",
    basophils: "A type of white blood cell involved in allergic and inflammatory responses.",

    // LFT
    alt: "ALT (Alanine Aminotransferase) — an enzyme mostly found in the liver. It's used as a general marker of liver activity.",
    ast: "AST (Aspartate Aminotransferase) — an enzyme found in the liver and other tissues, also used as a general marker of liver activity.",
    alp: "ALP (Alkaline Phosphatase) — an enzyme related to the liver and bones.",
    bilirubin_total: "A substance produced when red blood cells break down, processed by the liver.",
    albumin: "A protein made by the liver that helps carry substances through your blood and keeps fluid in your blood vessels.",
    total_protein: "The combined amount of all proteins in your blood, including albumin.",

    // KFT
    creatinine: "A waste product from normal muscle activity, filtered out of your blood by your kidneys.",
    urea: "A waste product from protein breakdown, filtered out of your blood by your kidneys.",
    uric_acid: "A waste product formed when your body breaks down purines (found in certain foods), filtered by your kidneys.",
    sodium: "A mineral (electrolyte) that helps control fluid balance and nerve function in your body.",
    potassium: "A mineral (electrolyte) important for heart and muscle function.",

    // Lipid Profile
    total_cholesterol: "The overall amount of cholesterol — a fat-like substance — circulating in your blood.",
    ldl: "LDL cholesterol — sometimes called 'bad' cholesterol, it carries cholesterol to your tissues.",
    hdl: "HDL cholesterol — sometimes called 'good' cholesterol, it helps carry cholesterol away from your tissues.",
    triglycerides: "A type of fat in your blood, largely coming from food, used for energy.",

    // HbA1c
    hba1c: "A measure of your average blood sugar level over the past two to three months.",

    // Vitamins
    vitamin_d: "A vitamin your body makes from sunlight and gets from some foods, important for bone health and immune function.",
    vitamin_b12: "A vitamin important for nerve function and making red blood cells.",

    // Thyroid
    tsh: "TSH (Thyroid Stimulating Hormone) — a signal from your brain that tells your thyroid gland how much hormone to produce.",
    t3: "T3 (Triiodothyronine) — one of the main hormones your thyroid gland produces.",
    t4: "T4 (Thyroxine) — the other main hormone your thyroid gland produces.",

    // Urine Routine
    urine_protein: "Checks whether protein is present in your urine, which normally shouldn't be there in meaningful amounts.",
    urine_glucose: "Checks whether sugar is present in your urine.",
    urine_ph: "Measures how acidic or alkaline your urine is.",
    urine_specific_gravity: "Measures how concentrated or diluted your urine is.",
};

// Tries a few key variations since AI-extracted names can vary slightly
export function getTestExplanation(normalizedName) {
    if (!normalizedName) return null;
    const key = normalizedName.toLowerCase().trim().replace(/\s+/g, "_");
    return TEST_GLOSSARY[key] || null;
}